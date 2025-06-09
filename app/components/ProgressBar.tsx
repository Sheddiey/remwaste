"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

import {
  FaMapMarkerAlt,
  FaTrash,
  FaWarehouse,
  FaClipboardCheck,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

export interface ProgressBarProps {
  currentStepIndex: number;
}

const steps = [
  { label: "Postcode", Icon: FaMapMarkerAlt },
  { label: "Waste Type", Icon: FaTrash },
  { label: "Select Skip", Icon: FaWarehouse },
  { label: "Permit Check", Icon: FaClipboardCheck },
  { label: "Choose Date", Icon: FaCalendarAlt },
  { label: "Payment", Icon: FaCreditCard },
];

export default function ProgressBar({ currentStepIndex }: ProgressBarProps) {
  const idx = Math.min(Math.max(currentStepIndex, 0), steps.length - 1);

  const progressSeg = idx > 0 ? idx - 1 : -1;

 
  const getIconComponent = (
    stepIdx: number,
    DefaultIcon: React.ComponentType<{ className?: string }>
  ) => {
    if (stepIdx < idx) {
      const CompletedIcon = () => (
        <Image src="/check.svg" alt="Completed" width={20} height={20} />
      );
      CompletedIcon.displayName = "CompletedIcon";
      return CompletedIcon;
    }
    if (stepIdx === idx) {
      const CurrentIcon = () => (
        <Image src="/progress.svg" alt="Current" width={20} height={20} />
      );
      CurrentIcon.displayName = "CurrentIcon";
      return CurrentIcon;
    }
    return DefaultIcon;
  };

  return (
    <>
      {/*  Desktop */}
      <div className="items-center hidden w-full pt-8 md:flex">
        {steps.map((step, stepIdx) => {
          const IconComp = getIconComponent(stepIdx, step.Icon);
          const isCompleted = stepIdx < idx;
          const isCurrent = stepIdx === idx;
          const textColorClass = clsx("text-sm font-bold uppercase", {
            "text-green-500 dark:text-green-500": isCompleted,
            "text-blue-600 dark:text-blue-400": isCurrent,
            "text-gray-500 dark:text-gray-400": !isCompleted && !isCurrent,
          });
          const segmentBgClass = clsx({
            "bg-green-500": stepIdx < progressSeg,
            "bg-blue-600": stepIdx === progressSeg,
            "bg-gray-300": stepIdx > progressSeg,
            "dark:bg-gray-600": stepIdx > progressSeg,
          });

          return (
            <React.Fragment key={stepIdx}>
              <div className="flex items-center gap-1 cursor-default min-w-[64px]">
                {/* Label */}
                <p className={textColorClass}>{step.label}</p>
                {/* Icon */}
                <IconComp className={clsx("w-5 h-5", textColorClass)} />
              </div>

              {stepIdx < steps.length - 1 && (
                <div
                  className={clsx(
                    "h-1 self-center mx-1 rounded-full",
                    segmentBgClass
                  )}
                  style={{ flex: 1 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/*  Mobile */}
      <div className="relative flex pt-4 pl-4 md:hidden">
        <div className="absolute top-0 bottom-0 w-1 bg-gray-200 left-4 dark:bg-gray-700">
          <div
            className="w-1 bg-blue-600 dark:bg-blue-400"
            style={{ height: `${((progressSeg + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step items */}
        <div className="flex flex-col items-start ml-8">
          {steps.map((step, stepIdx) => {
            const IconComp = getIconComponent(stepIdx, step.Icon);
            const isCompleted = stepIdx < idx;
            const isCurrent = stepIdx === idx;

            const labelClass = clsx("ml-2 text-sm uppercase", {
              "text-green-500 dark:text-green-500": isCompleted,
              "font-bold text-blue-600 dark:text-blue-400": isCurrent,
              "text-gray-500 dark:text-gray-400": !isCompleted && !isCurrent,
            });

            return (
              <div key={stepIdx} className="flex items-center mb-4">
                <IconComp
                  className={clsx("w-5 h-5", {
                    "text-green-500 dark:text-green-500": isCompleted,
                    "text-blue-600 dark:text-blue-400": isCurrent,
                    "text-gray-500 dark:text-gray-400":
                      !isCompleted && !isCurrent,
                  })}
                />
                <span className={labelClass}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
