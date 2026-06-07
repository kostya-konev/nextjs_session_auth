import type { Metadata } from 'next'

import { NewVerificationForm } from '@/features/auth/components/NewVerificationForm'

export const metadata: Metadata = {
	title: 'Email Confirmation'
}

export default function NewVerificationPage() {
	return <NewVerificationForm />
}
