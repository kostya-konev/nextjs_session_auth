export class FetchError extends Error {
	public constructor(
		public statusCode: number,
		public message: string
	) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

// if (!response.ok) {
//     throw new FetchError(response.status, 'User not found')
//   }

// try {
//     await api.getUser()
//   } catch (e) {
//     if (e instanceof FetchError) {
//       console.log(e.statusCode) // 404
//       console.log(e.message)    // 'User not found'
//       if (e.statusCode === 401) router.push('/login')
//     }
//   }
