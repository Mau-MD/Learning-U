import { useState } from "react";

interface Steps {
  title: string;
  content: string;
}

export const useTour = (steps: Steps[]) => {
  const [stepNum, setStep] = useState(-1);

  const nextStep = () => {
    setStep((step) => step + 1);
  };

  const startTour = () => {
    setStep(0);
  };

  return {
    stepNum,
    nextStep,
    startTour,
    currStep: steps[stepNum] || { title: "", content: "" },
  };
};
