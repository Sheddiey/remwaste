"use client";

import React, { useState, useEffect } from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import Image from "next/image";
import type { SkipItem } from "../lib/types";

export default function SelectSkip() {
  const [skips, setSkips] = useState<SkipItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(2);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSkip, setSelectedSkip] = useState<SkipItem | null>(null);

  useEffect(() => {
    async function loadSkips() {
      setIsLoading(true);
      const res = await fetch("/api/skips");
      if (!res.ok) {
        console.error("/api/skips error, status code:", res.status);
        setSkips([]);
        setIsLoading(false);
        return;
      }
      const data = (await res.json()) as SkipItem[];
      setSkips(data);
      setIsLoading(false);
    }
    loadSkips();
  }, []);

  const handleCardSelect = (skip: SkipItem) => {
    setSelectedSkip(skip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSkip(null);
  };

  return (
    <div className="w-[90%] mx-auto">
      <ProgressBar currentStepIndex={currentStep} />

      <div className="text-center mt-4 text-[#1D4ED8]">
        <p className="mb-1 text-2xl font-bold dark:text-white">
          Choose Your Skip Size
        </p>
        <div className="flex items-center justify-center gap-5">
          <p className="text-sm font-medium sm:text-base md:text-lg dark:text-white">
            Select the skip size that best suits your needs
          </p>
          <ThemeToggle />
        </div>
      </div>

      {isLoading ? (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-300">
          Loading skip options…
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {skips.map((skipItem) => (
            <Card
              key={skipItem.id}
              skip={skipItem}
              onSelect={handleCardSelect}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8 pb-4">
        <button
          onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
          className="px-4 py-2 text-gray-800 transition bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep((s) => Math.min(s + 1, 5))}
          className="px-4 py-2 text-white transition bg-[#2563EB] rounded hover:bg-[#1D4ED8] cursor-pointer"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedSkip
            ? `${selectedSkip.size} Yard Skip • £${selectedSkip.price_before_vat}`
            : undefined
        }
      >
        {selectedSkip && (
          <div className="space-y-4">
            <div className="h-60 w-full relative rounded-lg overflow-hidden">
              <Image
                className="object-cover"
                src={selectedSkip.size >= 20 ? "/image2.png" : "/image.png"}
                alt={`Skip size ${selectedSkip.size}`}
                fill
              />

              <div className="flex absolute bottom-3 left-3 flex-wrap gap-2">
                {!selectedSkip.allowed_on_road && (
                  <span className="px-2 py-1 bg-black/60 text-[#D69E2E] rounded-full text-xs font-semibold">
                    ⚠ Not allowed on road
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold dark:text-white">
                {selectedSkip.size}-Yard Skip
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Price:{" "}
                <span className="font-bold">
                  £{selectedSkip.price_before_vat}
                </span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Hire duration:{" "}
                <span className="font-semibold">
                  {selectedSkip.hire_period_days} Days
                </span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Postcode:{" "}
                <span className="font-medium">{selectedSkip.postcode}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
