export const describeYouOptions = ['runs_company', 'employee', 'agency', 'freelancer', 'investor', 'exploring'] as const
export type describeYouOptionsType = (typeof describeYouOptions)[number]