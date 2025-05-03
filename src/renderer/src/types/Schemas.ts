import { z } from 'zod'

export const ClientSchema = z.object({
  name: z
    .string()
    .min(1, 'Minimum 1 character is required')
    .max(20, 'Maximum 20 characters allowed'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(9, 'Minimum 9 digits required').max(12, 'Maximum 12 digits allowed'),
  gst: z.string().min(1, 'Minimum 1 character required').max(20, 'Maximum 20 characters allowed'),
  hsn: z.string().min(1, 'Minimum 1 character required').max(20, 'Maximum 20 characters allowed'),
  address: z.string().max(50, 'Maximum 50 characters allowed')
})

export type ClientSchemaType = z.infer<typeof ClientSchema>
