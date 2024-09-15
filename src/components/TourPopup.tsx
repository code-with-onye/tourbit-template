import { TourStep } from "@/types";
import React from "react";

interface TourPopupProps {
  step: TourStep;
  position: { top: number; left: number };
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  customStyles: React.CSSProperties;
}

export const TourPopup: React.FC<TourPopupProps> = ({
  step,
  position,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  customStyles,
}) => {
  return (
    <div
      className="fixed z-50 bg-white shadow-lg rounded-lg p-4 max-w-sm animate-bounce-slow"
      style={{
        ...customStyles,
        top: `${position.top}px`,
        left: `${position.left}px`,
        transition: "top 0.3s, left 0.3s",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 border p-0.5 rounded-lg shadow-sm hover:shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          className="text-gray-500 hover:text-gray-700"
          fill="none"
        >
          <path
            d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h3 className="lg:text-base text-sm text-gray-700 font-medium mb-2">
        {step.title}
      </h3>
      <p className="text-gray-600 mb-4 text-xs lg:text-sm">{step.content}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className={`flex items-center lg:text-sm text-xs ${
            currentStep === 0
              ? "text-gray-400"
              : "text-indigo-500 hover:text-indigo-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            className="text-gray-500 hover:text-gray-700"
            fill="none"
          >
            <path
              d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>
        <span className="lg:text-sm text-xs text-gray-500">
          {currentStep + 1} / {totalSteps}
        </span>
        <button
          onClick={onNext}
          className="flex items-center lg:text-sm text-xs text-indigo-500 hover:text-indigo-700"
        >
          {currentStep === totalSteps - 1 ? "Finish" : "Next"}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            className="text-gray-500 hover:text-gray-700"
            fill="none"
          >
            <path
              d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
