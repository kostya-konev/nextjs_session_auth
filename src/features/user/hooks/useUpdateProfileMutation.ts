import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeSettingsSchema } from '@/features/user/schemes'

import { toastMessageHandler } from '@/shared/utils'

import { userService } from '../services'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: ({ values }: { values: TypeSettingsSchema }) =>
			userService.updateProfile(values),
		onSuccess() {
			toast.success('Profile successfully updated')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { update, isLoadingUpdate }
}
