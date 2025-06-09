"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white dark:bg-[#1f2937] rounded-2xl shadow-2xl w-full max-w-lg mx-4",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4 text-gray-800 dark:text-gray-200 space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-[#4b5563] text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-[#374151] transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2563EB] dark:bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
