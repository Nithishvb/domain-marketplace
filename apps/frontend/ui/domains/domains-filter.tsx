import React from "react";
import { Label } from "@repo/ui";
import { Separator } from "@repo/ui";

const DomainsFilter = () => {
  return (
    <div className="h-screen bg-gray-800/50 p-4 backdrop-blur border-r border-gray-700">
      <h2 className="mb-4 text-lg font-semibold">Filter Options</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="price-filter" className="text-sm">
            Price Range
          </Label>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="age-filter" className="text-sm">
            Domain Age
          </Label>
        </div>
        <Separator className="my-4 bg-gray-700" />
        <div className="space-y-2">
          <Label className="text-sm">Categories</Label>
          <div className="space-y-2">
            {["Business", "Technology", "E-commerce", "Finance"].map(
              (category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    className="mr-2 rounded border-gray-600 bg-gray-700"
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainsFilter;
