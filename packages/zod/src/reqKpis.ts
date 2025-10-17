import { dateRangeSchema } from "./dateRange";
import * as z from 'zod'

export const reqKpisSchema = z.object({
  orgId: z.string().uuid(),
  dateRange: dateRangeSchema
})