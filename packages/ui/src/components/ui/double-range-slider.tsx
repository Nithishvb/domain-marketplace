"use client"

import { useCallback, useEffect, useState } from "react"

import { Input } from "./input.js"
import { CustomSlider } from "./custom-slider.js"

interface DoubleRangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  formatValue?: (value: number) => string
  trackColor?: string
  rangeColor?: string
  thumbColor?: string
}

export function DoubleRangeSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  formatValue = (value) => value.toString(),
  trackColor = "bg-gray-700",
  rangeColor = "bg-cyan-600",
  thumbColor = "bg-white",
}: DoubleRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value)
  const [inputValues, setInputValues] = useState({
    min: value[0].toString(),
    max: value[1].toString(),
  })

  useEffect(() => {
    setLocalValue(value)
    setInputValues({
      min: value[0].toString(),
      max: value[1].toString(),
    })
  }, [value])

  const handleSliderChange = useCallback(
    (newValue: number[]) => {
      const [newMin, newMax] = newValue as [number, number]
      if (newMin <= newMax) {
        setLocalValue([newMin, newMax])
        setInputValues({
          min: newMin.toString(),
          max: newMax.toString(),
        })
        onValueChange([newMin, newMax])
      }
    },
    [onValueChange]
  )

  const handleInputChange = useCallback(
    (type: "min" | "max", inputValue: string) => {
      const numericValue = parseFloat(inputValue)
      if (!isNaN(numericValue)) {
        let newMin = type === "min" ? numericValue : localValue[0]
        let newMax = type === "max" ? numericValue : localValue[1]

        // Ensure min doesn't exceed max and max doesn't go below min
        newMin = Math.max(min, Math.min(newMin, newMax))
        newMax = Math.min(max, Math.max(newMax, newMin))

        setLocalValue([newMin, newMax])
        setInputValues({
          min: newMin.toString(),
          max: newMax.toString(),
        })
        onValueChange([newMin, newMax])
      }
    },
    [localValue, min, max, onValueChange]
  )
  
  const handleInputBlur = useCallback(
    (type: "min" | "max") => {
      const value = parseFloat(inputValues[type])
      if (isNaN(value)) {
        setInputValues((prev) => ({
          ...prev,
          [type]: localValue[type === "min" ? 0 : 1].toString(),
        }))
      }
    },
    [localValue, inputValues]
  )

  return (
    <div className="space-y-4">
      <CustomSlider
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handleSliderChange}
        className="py-4"
        style={{
          "--track-color": `var(--${trackColor})`,
          "--range-color": `var(--${rangeColor})`,
          "--thumb-color": `var(--${thumbColor})`,
        } as React.CSSProperties}
      />
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={inputValues.min}
          onChange={(e) => handleInputChange("min", e.target.value)}
          onBlur={() => handleInputBlur("min")}
          className="h-8 w-20 bg-gray-800 text-center text-sm text-white"
          min={min}
          max={max}
          step={step}
        />
        <span className="text-gray-500">-</span>
        <Input
          type="number"
          value={inputValues.max}
          onChange={(e) => handleInputChange("max", e.target.value)}
          onBlur={() => handleInputBlur("max")}
          className="h-8 w-20 bg-gray-800 text-center text-sm text-white"
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  )
}

