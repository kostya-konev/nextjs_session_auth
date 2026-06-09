'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	UserButton,
	UserButtonLoading
} from '@/features/user/components/UserButton'
import { useUpdateProfileMutation } from '@/features/user/hooks'
import { SettingsSchema, TypeSettingsSchema } from '@/features/user/schemes'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Loading,
	Switch
} from '@/shared/components/ui'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/Form'
import { useProfile } from '@/shared/hooks'

export function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update({ values })
	}

	if (!user) return null

	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Profile settings</CardTitle>
				{isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-y-3'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormItem>Name</FormItem>
										<FormControl>
											<Input
												placeholder='Max'
												{...field}
												disabled={isLoadingUpdate}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
												disabled={isLoadingUpdate}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormItem>
												Two factor authentication
											</FormItem>
											<FormDescription>
												Turn on 2FA for your account
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={isLoadingUpdate}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={isLoadingUpdate}>
								Save
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
