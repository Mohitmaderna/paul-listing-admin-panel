import { ReactElement, useCallback, useState } from "react";

/**
 * A custom hook for creating a multi-step form.
 * @param {ReactElement[]} steps - The steps of the form.
 * @returns {object} An object with the current step index, the current step, the steps, whether the current step is the first step, whether the current step is the last step, a function to go to a specific step, a function to go to the next step, and a function to go to the previous step.
 */
export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
