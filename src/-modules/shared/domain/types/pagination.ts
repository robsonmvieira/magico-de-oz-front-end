export type SortOrder = 'asc' | 'desc'

export interface PaginationInput {
	page?: number
	limit?: number
	sortBy?: string
	sortOrder?: SortOrder
	search?: string
}
