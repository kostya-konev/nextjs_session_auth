'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useNewPasswordMutation } from '@/features/auth/hooks'
import {
	NewPasswordSchema,
	TypeNewPasswordSchema
} from '@/features/auth/schemes/new-password.schema'

import { Button, Input } from '@/shared/components/ui'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/Form'

export function NewPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	})

	const { newPassword, isLoadingNew } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			newPassword({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Please, finish reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='New password'
			description='Enter new password for your account'
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
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormItem>Password</FormItem>
								<FormControl>
									<Input
										placeholder='******'
										type='password'
										{...field}
										disabled={isLoadingNew}
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
					<Button type='submit' disabled={isLoadingNew}>
						Continue
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
