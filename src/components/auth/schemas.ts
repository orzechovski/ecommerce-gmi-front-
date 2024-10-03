import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(64, { message: 'Password can be up to 64 characters long.' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])/,
    'Password must contain at least one lowercase and one uppercase letter.'
  )

export const email = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Invalid email address'
  })
  .email({ message: 'Invalid email address' })
