import { configureStore } from '@reduxjs/toolkit';
import filterSlice from "@/lib/features/filter/filterSlice";

export const store = () => {
  return configureStore({
    reducer: {
      filter: filterSlice
    },
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
