import { useState } from "react";

interface Steps {
  title: string;
  content: string;
}

export const useTour = (steps: Steps[]) => {
  const [stepNum, setStep] = useState(0);

  const nextStep = () => {
    setStep((step) => step + 1);
  };

  return {
    stepNum,
    nextStep,
    currStep: steps[stepNum] || { title: "", content: "" },
  };
};
