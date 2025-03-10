import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  phone: z.string().min(10).max(14)
})

export { UserSchema }
