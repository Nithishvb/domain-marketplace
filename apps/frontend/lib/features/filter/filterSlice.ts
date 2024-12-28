import { RootState } from "@/lib/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDomains = createAsyncThunk(
  'data/fetch',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { priceRange, status } = state.filter;

    const queryParams = new URLSearchParams({
      priceRange: JSON.stringify({
        min: priceRange.min,
        max: priceRange.max
      }),
      status: status
    });

    const response = await fetch(``);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  }
);

export interface FilterStateType {
  priceRange: {
    min: number;
    max: number;
  };
  status: "verified" | "not verified" | "all";
  domains: string[]
}

const initialState: FilterStateType = {
  priceRange: {
    min: 0,
    max: 1000,
  },
  status: "all",
  domains: []
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceRange(state, action) {
      const { min, max } = action.payload;
      state.priceRange.min = min;
      state.priceRange.max = max;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetFilters(state) {
      state.priceRange.min = initialState.priceRange.min;
      state.priceRange.max = initialState.priceRange.max;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDomains.fulfilled, (state, action) => {
      state.domains.push(action.payload as string);
    })
  }
});

export const { setPriceRange, setStatus, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
