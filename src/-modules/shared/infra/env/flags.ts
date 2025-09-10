export const isAuthEnabled = (): boolean => {
	return import.meta.env.VITE_AUTH_ENABLED === 'true'
}


