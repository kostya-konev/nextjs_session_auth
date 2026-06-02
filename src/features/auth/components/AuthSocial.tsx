import { FaGoogle } from 'react-icons/fa'

import { Button } from '@/shared/components/ui'

export function AuthSocial() {
	return (
		<>
			<div className='grid grid-cols-1 gap-6'>
				<Button variant='outline'>
					<FaGoogle className='mr-2 size-4' />
					Google
				</Button>
			</div>
			<div className='relative mb-2 space-y-4'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background text-muted-foreground px-2'>
						Or
					</span>
				</div>
			</div>
		</>
	)
}
