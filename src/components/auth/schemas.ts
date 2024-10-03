import { z } from 'zod'

export const passwordSchema = z
   .string()
   .min(8, { message: 'Hasło musi się składać z minimum 8 znaków.' })
   .max(64, { message: 'Hasło może się składać z maksymalnie 64 znaków.' })
   .regex(/^(?=.*[a-z])(?=.*[A-Z])/, 'Hasło musi zawierać co najmniej jedną małą i jedną dużą literę')

export const email = z
   .string({
      required_error: 'Email jest wymagany',
      invalid_type_error: 'Niepoprawny adres email',
   })
   .email({ message: 'Niepoprawny adres email' })
//    .min(1, { message: 'Email jest wymagany' })
