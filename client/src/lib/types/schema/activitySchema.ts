// activitySchema.ts
import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z.string().min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  // Strictly expect a Date object. 
  // No union, no transform. This aligns the input and output types perfectly.
  date: z.date({
    message:"Date is required"
  }),
  city: requiredString('City'),
  venue: requiredString('Venue'),
});

export type ActivitySchema = z.infer<typeof activitySchema>;