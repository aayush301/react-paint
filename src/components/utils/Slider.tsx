import React, { useEffect, useState } from "react";
// Credits: youtube/@CodingNepal

const ValueLabel = ({ value }: { value: number }) => {
  const labelSize = 40;
  return (
    <div className="flex aspect-square items-center justify-center" style={{ width: labelSize }}>
      <div
        className="mx-auto flex aspect-square rotate-45 items-center justify-center rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[50%] bg-violet-500"
        style={{ width: labelSize / Math.sqrt(2) }}
      >
        <div className="-rotate-45 text-xs font-semibold text-white">{value}</div>
      </div>
    </div>
  );
};

const Thumb = ({
  thumbSize,
  isActive,
  disabled,
}: {
  thumbSize: number;
  isActive: boolean;
  disabled: boolean;
}) => {
  return (
    <div className="relative" style={{ width: thumbSize, height: thumbSize }}>
      <div
        className={`absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/50 transition ${
          isActive ? "scale-100" : "scale-0"
        }`}
      />
      <button
        className={`absolute h-full w-full cursor-pointer rounded-full shadow-md
        ${!disabled ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700" : "bg-gray-600"}`}
      />
    </div>
  );
};

interface SliderProps {
  value: number;
  onChange: Function;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  disabled?: boolean;
  alwaysDisplayValueLabel?: boolean;
}

const Slider = ({
  value,
  onChange = () => {},
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  disabled = false,
  alwaysDisplayValueLabel = false,
}: SliderProps) => {
  const [currValue, setCurrValue] = useState(defaultValue || (min + max) / 2);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (value) setCurrValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrValue(value);
    onChange(value);
  };

  const thumbSize = 16;
  const gapBetweenLabelAndThumb = 4;
  const getPercentWidthFromValue = (value: number) => ((value - min) * 100) / (max - min);

  return (
    <>
      <div
        className={`relative h-1.5 w-48 select-none rounded-lg transition-all ${
          !disabled ? "bg-gray-200" : "bg-gray-300"
        }`}
      >
        {/* Thumb and Value label */}
        <div
          className="absolute z-20 flex h-full -translate-x-1/2 flex-col items-center transition-all"
          style={{ left: `${getPercentWidthFromValue(currValue)}%` }}
        >
          {/* Thumb */}
          <div className="absolute top-1/2 z-20 -translate-y-1/2">
            <Thumb thumbSize={thumbSize} isActive={active} disabled={disabled} />
          </div>

          {/* Value label */}
          <div
            className={`absolute z-30 -translate-y-full transition delay-75
                ${alwaysDisplayValueLabel || active ? "scale-100" : "scale-0"}`}
            style={{ top: `calc(50% - ${thumbSize / 2}px - ${gapBetweenLabelAndThumb}px)` }}
          >
            <ValueLabel value={currValue} />
          </div>
        </div>

        {/* Percent of width shown in dark color */}
        <div
          className={`absolute h-full rounded-lg transition-all ${
            !disabled ? "bg-violet-400" : "bg-gray-400"
          }`}
          style={{ left: "0", right: `${100 - getPercentWidthFromValue(currValue)}%` }}
        />

        {/* Marks */}
        {marks && (
          <>
            {Array(Math.ceil((max - min) / step - 1))
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 aspect-square h-1/2 -translate-y-1/2 rounded-full bg-white"
                  style={{ left: `${getPercentWidthFromValue(min + step * (idx + 1))}%` }}
                />
              ))}
          </>
        )}

        {/* Actual range input made disappeared */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currValue}
          disabled={disabled}
          onChange={handleChange}
          onMouseDown={() => setActive(true)}
          onBlur={() => setActive(false)}
          onTouchEnd={() => setActive(false)}
          onMouseUp={() => setActive(false)}
          style={{ width: `calc(100% + ${thumbSize}px)`, left: `-${thumbSize / 2}px` }}
          className="absolute z-50 cursor-pointer appearance-none opacity-0
                [&::-webkit-slider-thumb]:h-[16px]
                [&::-webkit-slider-thumb]:w-[16px]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
              "
        />
      </div>
    </>
  );
};

export default Slider;
