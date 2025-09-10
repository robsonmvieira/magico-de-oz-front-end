import { isAuthEnabled } from '@/-modules/shared/infra/env/flags'
import ky from 'ky'

export const http = ky.create({
	prefixUrl: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	hooks: {
		afterResponse: [
			async (_input, _options, response) => {
				if (!isAuthEnabled()) return
				if (response.status === 401) {
					authHandlers.onUnauthorized?.()
				}
				if (response.status === 403) {
					authHandlers.onForbidden?.()
				}
			}
		]
	}
})

type AuthHandlers = {
	onUnauthorized?: () => void
	onForbidden?: () => void
}

let authHandlers: AuthHandlers = {}

export function setAuthErrorHandlers(handlers: AuthHandlers) {
	authHandlers = handlers
}
