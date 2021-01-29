import { Status, Step, Steps, SubStep } from "../models/Step";

// Helper class for finding, updating and validating steps

export class Utils {

  /**
   * This method updates selected step or it's subStep status and collpsing functionality.
   * More update logic can be added here.
   * @param selected selected step to modify/update
   * @param ind index for finding and updating step
   */
  public static update(selected: Step, ind: number) {
    // change selected step status
    const inProgress = !selected.ready && Status.IN_PROGRESS;
    const selectedstep = {
      ...selected,
      status: inProgress,
      data: selected.data ? {
        ...selected.data,
        status: inProgress
      } : null
    };

    // find out if we're updating subStep with provided index
    const subStepExists = Utils.subStepExists(selectedstep.subStep, ind);

    // new subStep object, change status
    const newSubStep = subStepExists && {
      ...Utils.findSubStep(selectedstep.subStep, ind),
      status: Status.IN_PROGRESS
    };
    const subStepArr = subStepExists && [...selectedstep.subStep];
    const index = subStepExists && subStepArr.findIndex((p) => p.stepIndex === ind);
    const prevSubstepInd = subStepExists && subStepArr.findIndex((p) => p.status === Status.IN_PROGRESS);

    // update previous subStep
    if (subStepArr[prevSubstepInd]) subStepArr[prevSubstepInd] = {...subStepArr[prevSubstepInd], status: Status.FINISHED};

    // update new subStep
    if (subStepExists) subStepArr[index] = {...newSubStep};

    // final updated object
    const updated = subStepExists
      ? { ...selectedstep, data: selectedstep.data ? { ...selectedstep.data, status: Status.FINISHED } : null, subStep: [...subStepArr]} // CASE 1 - we are updating current step's data object status and current step's subStep
      : { ...selectedstep, collapsed: selectedstep.hasSubStep ? true : false } // CASE 2 - update current step and collapse if it has a subStep

    return {
      updatedStep: updated as Step,
      updatedSubStep: newSubStep as SubStep
    }
  }

  public static prev(selected: Step, ind: number, availableSteps: Steps) {
    let updatedStep = {} as Step;
    let updatedSubStep = {} as Step;

    const isSubStep = Utils.subStepExists(selected.subStep, ind);
    const parentIndex = (Utils.findAt(availableSteps, ind) as SubStep).parentIndex; // get parent index from previous subStep

    if (!isSubStep && !!parentIndex) { // CASE 1 - go to previous parent steps child subStep
      const { updatedParent, subStep } = this.findAndUpdatePreviousParent(availableSteps, ind);
      updatedSubStep = subStep;
      updatedStep = updatedParent;
    } else if (isSubStep) { // CASE 2 - go to previous subStep
      const { updated, newSubStep } = this.findAndUpdatePreviousSubStep(selected, ind);
      updatedStep = updated;
      updatedSubStep = newSubStep;
    } else { // CASE 3 - standard step (without subStep)
      updatedStep = {
        ...selected,
        status: Status.IN_PROGRESS,
        ready: false,
        data: {...selected.data, status: Status.IN_PROGRESS}
      };
      updatedSubStep = null;
    }

    return {
      updatedStep,
      updatedSubStep
    }
  }

  private static findAndUpdatePreviousSubStep(step: Step, ind: number) {
    let updated = {...step};
    const newSubStep = {...Utils.findSubStep(updated.subStep, ind), status: Status.IN_PROGRESS};
    let updatedSubStepArr = [...updated.subStep];
    const index = updatedSubStepArr.findIndex(s => s.stepIndex === ind);
    updatedSubStepArr[index] = newSubStep;
    updated = {...updated, subStep: [...updatedSubStepArr]};
    return {
      updated,
      newSubStep
    }
  }

  private static findAndUpdatePreviousParent(steps: Steps, ind: number) {
    let updatedSubStep = {
      ...Utils.findAt(steps, ind) as SubStep,
      status: Status.IN_PROGRESS
    };
    const parent = {...Utils.findStep(steps, updatedSubStep.parentIndex)} // find parent step
    const updatedSubStepArr = [...parent.subStep];
    const index = updatedSubStepArr.findIndex(s => s.stepIndex === updatedSubStep.stepIndex);
    updatedSubStepArr[index] = updatedSubStep;

    return {
      updatedParent: {
        ...parent,
        collapsed: true,
        data: {
          ...parent.data,
          status: Status.INACTIVE
        },
        subStep: [...updatedSubStepArr],
        status: Status.IN_PROGRESS,
        ready: false
      },
      subStep: updatedSubStep
    }
  }

  public static calculateLength(steps: Steps): number {
    const stepsIterable = Object.values(steps);
    let length = stepsIterable.length;

    for (let i = 0; i < stepsIterable.length; i++) {
      const step = stepsIterable[i];
      if (step.subStep && step.subStep.length > 0) {
        const subStep = stepsIterable[i].subStep;
        const len = subStep.length;
        length += len;
      }
    }
    return length;
  }

  /**
   * finds and returns step
   * @param steps - available steps obj
   * @param ind - index of the step to find
   * @param currentStep - initial value will be returned if no match will occur
   */
  public static findStep(steps: Steps, ind: number, currentStep?: any) {
    return Object.values(steps).reduce(
      (curr, step) => {
        if (step.stepIndex === ind) {
          curr = { ...step };
        }
        return curr;
      },
      { ...currentStep } // initial value will be currently selected step if nothing gets matched
    )
  }

  public static findAt(steps: Steps, ind: number) {
    return Object.values(steps).reduce(
      (curr, step) => {
        if (step.stepIndex === ind) {
          curr = {...step};
        }

        // step has a subStep
        if (step.stepIndex !== ind && Utils.subStepExists(step.subStep, ind)) {
          curr = {...Utils.findSubStep(step.subStep, ind)};
        }

        return curr;
      },
      {}
    )
  }

  /**
   * Validates if object contains a step at specified index
   */
  public static hasAvailableStep(steps: Steps, ind: number): boolean {
    return Object.values(steps).some((step) => {
      if (step.stepIndex === ind) {
        return true;
      }

      if (step.stepIndex !== ind && Utils.subStepExists(step.subStep, ind)) {
        return true;
      }

      return false;
    })
  }

  public static subStepExists(subStep: SubStep[], ind: number): boolean {
    return Array.isArray(subStep) && subStep.some((op) => op.stepIndex === ind);
  }

  public static findSubStep(subStep: SubStep[], ind: number): SubStep {
    return subStep.filter((op) => op.stepIndex === ind)[0];
  }

}
