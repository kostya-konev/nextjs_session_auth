import { TypeResetPasswordSchema } from '@/features/auth/schemes'
import { TypeNewPasswordSchema } from '@/features/auth/schemes/new-password.schema'
import { IAuthResponse } from '@/features/auth/types'

import { api } from '@/shared/api'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined
		const response = await api.post<IAuthResponse>(
			'auth/password-recovery/reset',
			body,
			{
				headers
			}
		)
		return response
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined
		const response = await api.post<IAuthResponse>(
			`auth/password-recovery/new/${token}`,
			body,
			{
				headers
			}
		)
		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
