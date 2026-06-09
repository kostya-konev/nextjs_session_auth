'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useResetPasswordMutation } from '@/features/auth/hooks'
import {
	ResetPasswordSchema,
	TypeResetPasswordSchema
} from '@/features/auth/schemes'

import { Button, Input } from '@/shared/components/ui'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/Form'

export function ResetPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordSchema) => {
		if (recaptchaValue) {
			reset({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Please, finish reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Password reset'
			description='To reset password enter your email'
			backButtonLabel='Login account'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormItem>Email</FormItem>
								<FormControl>
									<Input
										placeholder='max@example.com'
										type='email'
										{...field}
										disabled={isLoadingReset}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>
					<Button type='submit' disabled={isLoadingReset}>
						Reset
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
