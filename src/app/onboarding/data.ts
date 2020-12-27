import { Steps } from './models/Step';

export enum STEP_TYPES {
  COMPANY_TYPE = 'COMPANY_TYPE',
  STATE = 'STATE',
  BUSINESS_DETAILS = 'BUSINESS_DETAILS',
  BUSINESS_DETAILS_ABOUT = 'BUSINESS_DETAILS_ABOUT',
  BUSINESS_DETAILS_ADDITIONAL = 'BUSINESS_DETAILS_ADDITIONAL',
  BUSINESS_DETAILS_TEST = 'BUSINESS_DETAILS_TEST',
  TEAM = 'TEAM',
  PERSONAL = 'PERSONAL',
  TEST = 'TEST',
}

// STEPS DATA
export const steps: Steps = {
  COMPANY_TYPE: {
    stepIndex: 0,
    title: 'Company Type',
    type: STEP_TYPES.COMPANY_TYPE,
  },
  STATE: {
    stepIndex: 1,
    title: 'State',
    type: STEP_TYPES.STATE,
  },
  BUSINESS_DETAILS: {
    stepIndex: 2,
    title: 'Business Details',
    hasSubStep: true,
    data: {
      title: 'Details',
    },
    type: STEP_TYPES.BUSINESS_DETAILS,
    subStep: [
      {
        stepIndex: 3,
        title: 'About',
        parentIndex: 2,
        type: STEP_TYPES.BUSINESS_DETAILS_ABOUT,
      },
      {
        stepIndex: 4,
        title: 'Additional Details',
        parentIndex: 2,
        type: STEP_TYPES.BUSINESS_DETAILS_ADDITIONAL,
      },
    ],
  },
  TEAM: {
    stepIndex: 5,
    title: 'Team',
    type: STEP_TYPES.TEAM,
    hasSubStep: true,
    data: {
      title: 'Team Members',
    },
    subStep: [
      {
        stepIndex: 6,
        title: 'About',
        parentIndex: 5,
        type: STEP_TYPES.BUSINESS_DETAILS_ABOUT,
      },
      {
        stepIndex: 7,
        title: 'Additional Details',
        parentIndex: 5,
        type: STEP_TYPES.BUSINESS_DETAILS_ADDITIONAL,
      },
    ],
  },
  PERSONAL: {
    stepIndex: 8,
    title: 'Personal Details',
    type: STEP_TYPES.PERSONAL,
  },
};
