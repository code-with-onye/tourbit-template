import { TourStep } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useFeatureTourState = (
  steps: TourStep[],
  onComplete: () => void,
  persistKey: string
) => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(persistKey);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(persistKey, currentStep.toString());
  }, [currentStep, persistKey]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleClose = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return { currentStep, handleNext, handlePrev, handleClose };
};
