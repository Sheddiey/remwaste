"use client";

import Image from "next/image";
import React from "react";
import type { SkipItem } from "../lib/types";

interface CardProps {
  skip: SkipItem;
  onSelect: (skip: SkipItem) => void;
}

const Card: React.FC<CardProps> = ({ skip, onSelect }) => {
  const noHeavyWaste = !skip.allows_heavy_waste;
  const noRoad = !skip.allowed_on_road;
  const fullyDisabled = noHeavyWaste && noRoad;

  return (
    <div className="relative">
      {/* Main card container */}
      <div
        onClick={() => {
          if (!fullyDisabled) onSelect(skip);
        }}
        className={`
          bg-white dark:bg-[#1f2937] rounded-2xl 
          shadow-md shadow-black/10 overflow-hidden flex flex-col 
          transform transition-transform duration-200 
          ${
            fullyDisabled
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 cursor-pointer"
          }
        `}
      >
        {/* Image + labels */}
        <div className="w-full aspect-[16/10] relative">
          <Image
            className="object-cover"
            src={skip.size >= 20 ? "/image2.png" : "/image.png"}
            alt={`Skip size ${skip.size}`}
            fill
          />

          {/* Size badge */}
          <div className="absolute top-3 right-3 bg-[#2563EB] px-2 py-1.5 rounded-full text-white">
            <p className="text-xs font-bold uppercase">{skip.size} Yards</p>
          </div>

          {/* Bottom labels */}
          <div className="absolute flex flex-col space-y-1 bottom-5 left-3">
            {noRoad && (
              <div className="bg-black/60 flex items-center text-[#D69E2E] rounded-full px-2 py-0.5 text-xs font-semibold">
                ⚠ Not allowed on road
              </div>
            )}
            {noHeavyWaste && (
              <div className="bg-black/60 flex items-center text-[#E53E3E] rounded-full px-2 py-0.5 text-xs font-semibold">
                🚫 Not for heavy waste
              </div>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col justify-between flex-1 px-4 py-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-base font-semibold md:text-lg dark:text-white">
                {skip.size}-Yard Skip
              </p>
              <p className="font-bold text-xl md:text-2xl text-[#2563EB] dark:text-[#f5f5f5]">
                £{skip.price_before_vat}
              </p>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 md:text-base">
              Hire duration:{" "}
              <span className="font-semibold">
                {skip.hire_period_days} Days
              </span>
            </p>
          </div>

          {/* “Select this Skip” button */}
          <button
            disabled={fullyDisabled}
            className={`
              mt-4 w-full rounded-md py-2 px-4 font-semibold text-base md:text-lg
              shadow-sm shadow-black/30 backdrop-blur-sm transition
              ${
                fullyDisabled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#EFF6FF] dark:bg-[#4b5563] hover:bg-[#dbeafe] dark:hover:bg-[#374151]"
              }
            `}
          >
            Select this Skip
          </button>
        </div>
      </div>

      {/* Overlay if fully disabled */}
      {fullyDisabled && (
        <div className="absolute inset-0 z-10 rounded-2xl bg-white/30 dark:bg-black/30" />
      )}
    </div>
  );
};

export default Card;
