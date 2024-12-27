import React, { useState } from "react";
import { Badge, Card, CardContent, CardHeader, CardTitle, Checkbox, DoubleRangeSlider, Label, Slider } from "@repo/ui";
import { Separator } from "@repo/ui";
import {  Clock, DollarSign, Tags } from "lucide-react";


const categories = [
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "finance", label: "Finance" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
]

const DomainsFilter = () => {

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [ageRange, setAgeRange] = React.useState<[number, number]>([0, 10]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  const formatPrice = (value: number) => `$${value}`
  const formatAge = (value: number) => `${value}y`

  return (
    <Card className="h-fit border-r overflow-hidden border-gray-800 bg-gradient-to-b from-gray-900 to-black h-[94%] overflow-auto rounded-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
          <Tags className="h-5 w-5" />
          Filter Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <DollarSign className="h-4 w-4" />
              Price Range
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-200">
                ${priceRange[0]}
              </Badge>
              <span className="text-gray-500">-</span>
              <Badge variant="secondary" className="bg-gray-800 text-gray-200">
                ${priceRange[1]}
              </Badge>
            </div>
          </div>
          <DoubleRangeSlider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            formatValue={formatPrice}
          />
        </div>

        <Separator className="bg-gray-800" />

        {/* Domain Age */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <Clock className="h-4 w-4" />
              Domain Age
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-200">
                {ageRange[0]}y
              </Badge>
              <span className="text-gray-500">-</span>
              <Badge variant="secondary" className="bg-gray-800 text-gray-200">
                {ageRange[1]}y
              </Badge>
            </div>
          </div>
          <DoubleRangeSlider
            min={0}
            max={10}
            step={1}
            value={ageRange}
            onValueChange={setAgeRange}
            formatValue={formatAge}
          />
        </div>

        <Separator className="bg-gray-800" />

        {/* Categories */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <Tags className="h-4 w-4" />
            Categories
          </Label>
          <div className="grid gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group flex items-center space-x-3 space-y-0"
              >
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked
                        ? [...selectedCategories, category.id]
                        : selectedCategories.filter((id) => id !== category.id)
                    )
                  }}
                  className="border-gray-700 bg-gray-800 data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white"
                />
                <Label
                  htmlFor={category.id}
                  className="cursor-pointer text-sm font-medium text-gray-200 group-hover:text-gray-100"
                >
                  {category.label}
                </Label>
                <Badge
                  variant="secondary"
                  className="ml-auto bg-gray-800 text-xs text-gray-400"
                >
                  {Math.floor(Math.random() * 100)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainsFilter;
