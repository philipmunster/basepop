export const describeCompanyOptions = ['1-5', '6-20', '21-100', '+100'] as const
export type describeCompanyOptionsType = (typeof describeCompanyOptions)[number]