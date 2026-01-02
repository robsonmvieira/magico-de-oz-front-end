export const queryKeys = {
	assets: {
		list: (params?: unknown) => ['assets', 'list', params ?? {}] as const,
		create: (params?: unknown) => ['assets', 'create', params ?? {}] as const,
		byId: (id: string) => ['assets', 'byId', id] as const
	},
	vsl: {
		list: (params?: unknown) => ['vsl', 'list', params ?? {}] as const,
		create: (params?: unknown) => ['vsl', 'create', params ?? {}] as const,
		byId: (id: string) => ['vsl', 'byId', id] as const
	}
}
