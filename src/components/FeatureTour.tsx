import React, { useState, useEffect, useCallback } from "react";
// import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface TourStep {
  selector: string;
  title: string;
  content: string;
}

interface FeatureTourProps {
  steps: TourStep[];
  onComplete: () => void;
  customStyles?: React.CSSProperties;
  persistKey?: string;
}

const FeatureTour: React.FC<FeatureTourProps> = ({
  steps,
  onComplete,
  customStyles = {},
  persistKey = "feature-tour-progress",
}) => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(persistKey);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (steps && currentStep < steps.length) {
      const element = document.querySelector(steps[currentStep].selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let top = rect.bottom + window.scrollY + 10;
        let left = rect.left + window.scrollX;

        // Adjust if the popup would go off-screen
        if (top + 200 > viewportHeight) {
          top = rect.top + window.scrollY - 210; // 200 for height + 10 for spacing
        }
        if (left + 300 > viewportWidth) {
          left = viewportWidth - 310; // 300 for width + 10 for spacing
        }

        setPosition({ top, left });
      }
    }
  }, [currentStep, steps]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [updatePosition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem(persistKey, currentStep.toString());
  }, [currentStep, persistKey]);

  const handleNext = () => {
    if (steps && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onComplete();
  };

  if (!steps || steps.length === 0 || currentStep >= steps.length) return null;

  const highlightActiveElement = () => {
    const element = document.querySelector(steps[currentStep].selector);
    if (element) {
      element.classList.add("feature-tour-highlight");
    }
    return () => {
      if (element) {
        element.classList.remove("feature-tour-highlight");
      }
    };
  };

  useEffect(highlightActiveElement, [currentStep, steps]);

  return (
    <>
      <style>
        {`
          .feature-tour-highlight {
            position: relative;
            z-index: 50;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
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
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X{/* <X size={20} /> */}
        </button>
        <h3 className="text-lg font-semibold mb-2">
          {steps[currentStep].title}
        </h3>
        <p className="text-gray-600 mb-4">{steps[currentStep].content}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center ${
              currentStep === 0
                ? "text-gray-400"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {/* <ChevronLeft size={20} /> */}
            Previous
          </button>
          <span className="text-sm text-gray-500">
            {currentStep + 1} / {steps.length}
          </span>
          <button
            onClick={handleNext}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
            {/* <ChevronRight size={20} /> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeatureTour;
