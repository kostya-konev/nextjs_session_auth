import type { Metadata } from 'next'

import { NewPasswordForm } from '@/features/auth/components/NewPasswordForm'

export const metadata: Metadata = {
	title: 'New password',
	description: ''
}

export default function NewPasswordPage() {
	return <NewPasswordForm />
}
