'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useLoginMutation } from '@/features/auth/hooks/useLoginMutation'
import { LoginSchema, TypeLoginSchema } from '@/features/auth/schemes'

import { Button, Input } from '@/shared/components/ui'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/Form'

export function LoginForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Please finish reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Login'
			description='To login the site enter your email and password'
			backButtonLabel='Do not have an account? Register'
			backButtonHref='/auth/register'
			isShowSocial
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
										disabled={isLoadingLogin}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
										disabled={isLoadingLogin}
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
					<Button type='submit' disabled={isLoadingLogin}>
						Login account
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
