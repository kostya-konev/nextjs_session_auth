'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider } from '@/shared/providers/TanstackQueryProvider'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
