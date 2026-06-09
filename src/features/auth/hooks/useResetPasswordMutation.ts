import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeResetPasswordSchema } from '@/features/auth/schemes'
import { passwordRecoveryService } from '@/features/auth/services'

import { toastMessageHandler } from '@/shared/utils'

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordSchema
			recaptcha: string
		}) => passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Check email', {
				description: 'Confirmation link was sent to your email address'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { reset, isLoadingReset }
}
