import React, { useEffect, useState } from "react";

interface Steps {
  title: string;
  content: React.ReactNode;
}

const localStorageKey = "learning-u-tour";

export const useTour = (steps: Steps[], key: string) => {
  const [stepNum, setStep] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const tourCompleted = getTourCompletedFromLocalStorage();

    if (!tourCompleted) {
      saveInitialTourCompletedInLocalStorage();
      startTour();
      return;
    }

    if (!tourCompleted[key]) {
      startTour();
      return;
    }

    setIsFinished(true);
  }, [key]);

  const getTourCompletedFromLocalStorage = () => {
    const tourCompleted = localStorage.getItem(localStorageKey);

    if (!tourCompleted) {
      return null;
    }

    return JSON.parse(tourCompleted);
  };

  const saveFinishedInLocalStorage = () => {
    const tourCompleted = getTourCompletedFromLocalStorage();
    tourCompleted[key] = true;
    localStorage.setItem(localStorageKey, JSON.stringify(tourCompleted));
  };

  const saveInitialTourCompletedInLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify({}));
  };

  const nextStep = () => {
    if (stepNum + 1 >= steps.length) {
      saveFinishedInLocalStorage();
      setIsFinished(true);
    }
    setStep((step) => step + 1);
  };

  const prevStep = () => {
    setStep((step) => step - 1);
  };

  const startTour = () => {
    setStep(0);
  };

  return {
    stepNum,
    prevStep,
    nextStep,
    startTour,
    isFinished,
    currStep: steps[stepNum] || { title: "", content: "" },
  };
};
