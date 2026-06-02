import { z } from 'zod'

export const LoginSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(9, { message: 'Min length is 6 characters' })
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
