export const queryKeys = {
	assets: {
		list: (params?: unknown) => ['assets', 'list', params ?? {}] as const,
		create: (params?: unknown) => ['assets', 'create', params ?? {}] as const,
		byId: (id: string) => ['assets', 'byId', id] as const
	}
}


