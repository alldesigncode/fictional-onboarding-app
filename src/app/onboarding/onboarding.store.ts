import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { steps } from '../data';
import { OnboardingState, Status, Step, Steps, SubStep } from './models/Step';
import { Utils } from './utils/stepUtils';

@Injectable()
export class OnboardingStore extends ComponentStore<OnboardingState> {
  constructor() {
    super({
      availableSteps: steps,
      stepIndex: null,
      selectedStep: null,
      selectedSubStep: null,
      stepsLength: 0,
    });
  }

  public readonly stepList$: Observable<Step[]> = this.select((state) => Object.values(state.availableSteps));
  public readonly step$: Observable<number> = this.select((state) => state.stepIndex);
  public readonly selectedStep$: Observable<Step> = this.select((state) => state.selectedStep);
  public readonly selectedSubStep$: Observable<SubStep> = this.select((state) => state.selectedSubStep);

  public readonly finalizedStep$ = this.select(
    this.selectedStep$,
    this.selectedSubStep$,
    (step, subStep) => {
      if (!subStep) {
        return step;
      } else {
        return subStep;
      }
    }
  )


  readonly setLength = this.updater((state) => ({
    ...state,
    stepsLength: Utils.calculateLength(state.availableSteps)
  }))


  readonly finishCurrentStep = this.updater((state) => {
    let selectedStep = {...state.selectedStep};
    return {
      ...state,
      availableSteps: {
        ...state.availableSteps,
        [selectedStep.type]: {
          ...selectedStep,
          status: Status.FINISHED,
          collapsed: false,
          ready: true
        }
      }
    }
  });

  readonly undoCurrentStep = this.updater((state) => {
    let selectedStep = {...state.selectedStep} as Step;
    const subStepToModify =
      selectedStep.collapsed &&
      selectedStep.subStep &&
      selectedStep.subStep.length > 0 &&
      selectedStep.subStep.some((s) => s.status === Status.IN_PROGRESS);

      if (subStepToModify) {
        const subStepArr = [...selectedStep.subStep];
        const ind = subStepArr.findIndex(s => s.status === Status.IN_PROGRESS);
        subStepArr[ind] = {...subStepArr[ind], status: Status.INACTIVE};
        selectedStep = {
          ...selectedStep,
          subStep: [...subStepArr]
        }
      }

      return {
        ...state,
        selectedStep: selectedStep,
        availableSteps: {
          ...state.availableSteps,
          [selectedStep.type]: {
            ...selectedStep,
            collapsed: subStepToModify ? true : false,
            status: subStepToModify ? Status.IN_PROGRESS : Status.INACTIVE,
            ready: false
          }
        }
      }
  })

  /**
   * Finds and updates current step and original object data based on provided step index
   * @param ind Step index
   */
  readonly updateStep = this.updater((state: OnboardingState, { ind, undo = false }: { ind: number; undo?: boolean }) => {
    const foundStep = {...Utils.findStep(state.availableSteps, ind, state.selectedStep)};
    let selectedStep = {} as Step, selectedSubStep = {} as SubStep;

    if (!undo) {
      const { updatedStep, updatedSubStep } = Utils.update(foundStep, ind);
      selectedStep = updatedStep, selectedSubStep = updatedSubStep;
    } else {
      const { updatedStep, updatedSubStep } = Utils.prev(foundStep, ind, state.availableSteps);
      selectedStep = updatedStep, selectedSubStep = updatedSubStep;
    }

    return {
      ...state,
      stepIndex: Utils.hasAvailableStep(state.availableSteps, ind) ? ind : state.stepIndex, // fallback to current index if no match
      selectedStep,
      selectedSubStep,
      availableSteps: {
        ...state.availableSteps,
        [selectedStep.type]: {
          ...selectedStep
        }
      }
    }
  })
}
