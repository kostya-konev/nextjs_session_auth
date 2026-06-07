'use client'

import { useEffect } from 'react'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useVerificationMutation } from '@/features/auth/hooks/useVerificationMutation'

import { Loading } from '@/shared/components/ui/Loading'

export function NewVerificationForm() {
	const searchParams = new URLSearchParams()
	const token = searchParams.get('token')
	const { verification } = useVerificationMutation()
	useEffect(() => {
		verification(token)
	}, [token])

	return (
		<AuthWrapper heading='Email confirmation'>
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}
