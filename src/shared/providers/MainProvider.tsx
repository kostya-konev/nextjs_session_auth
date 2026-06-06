'use client'

import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { TanstackQueryProvider } from '@/shared/providers/TanstackQueryProvider'

import { ThemeProvider } from './ThemeProvider'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
				storageKey='project-theme'
			>
				{children}
				<Toaster theme='system' position='bottom-right' richColors />
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
