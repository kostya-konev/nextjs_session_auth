export type TypeSearchParams = {
	[key: string]:
		| string
		| number
		| boolean
		| undefined
		| Array<string | number | boolean | undefined>
}

export interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
	params?: TypeSearchParams
}

export type TypeFetchRequestConfig<Params = undefined> =
	Params extends undefined
		? { config?: RequestOptions }
		: { params: Params; config?: RequestOptions }

// const a: TypeFetchRequestConfig = {
//   config: { headers: { Authorization: 'Bearer xxx' } }
// }

// const b: TypeFetchRequestConfig<{ email: string; password: string }> = {
//   params: { email: 'a@b.c', password: '123' },
//   config: {
//     headers: { 'Content-Type': 'application/json' },
//     params: { lang: 'en', verbose: true }   // это уже TypeSearchParams → ?lang=en&verbose=true
//   }
// }
