import * as z from 'zod'

export const dateRangeSchema = z.object({
  from: z.date(),
  to: z.date()
}).refine( ({from, to}) => from <= to, "the 'from' date must be earlier than or equal to the 'to' date")