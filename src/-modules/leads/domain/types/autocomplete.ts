export type AutocompletePlace = {
	placeId: string
	name: string
	address: string
}

export type AutocompleteInput = {
	query: string
	country?: string
	location?: string
}
