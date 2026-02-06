export type Response<T> = {
	createdAt: string
	hasError: boolean
	error: string | null
	errorMessage: string | null
	data: T | null
	ok: boolean | null
	statusCode?: number
	totalItems?: number
	page?: number
	limit?: number
	totalPages?: number
	hasNextPage?: boolean
	hasPreviousPage?: boolean
}
