import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { TypeLoginSchema } from '@/features/auth/schemes'
import { authService } from '@/features/auth/services'

import { toastMessageHandler } from '@/shared/utils'

export function useLoginMutation(
	setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()
	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeLoginSchema
			recaptcha: string
		}) => authService.login(values, recaptcha),
		onSuccess(data: any) {
			if (data.message) {
				setIsShowTwoFactor(true)
				toastMessageHandler(data)
			} else {
				toast.success('Login successful')
				router.push('/dashboard/settings')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
