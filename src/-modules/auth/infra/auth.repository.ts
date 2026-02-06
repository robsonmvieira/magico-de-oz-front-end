import type { Response } from '@/-modules/shared/domain/classes'
import { isAuthEnabled } from '@/-modules/shared/infra/env/flags'
import type { HttpClient } from '@/-modules/shared/infra/http/http-client'
import { BaseRepository } from '@/-modules/shared/infra/repositories/base.repository'
import type { User } from '../domain/types'

export class AuthRepository extends BaseRepository {
	constructor(http: HttpClient) {
		super(http, 'crm/auth')
	}

	async getCurrentUser(): Promise<User | null> {
		if (!isAuthEnabled()) {
			return {
				id: 'local-user',
				name: 'Local User',
				roles: ['admin']
			}
		}
		const response = await this.http.get<User>('me', {})
		return response.data
	}

	async login(_credentials: {
		email: string
		password: string
	}): Promise<Response<void>> {
		// stub - implementar login
		return {
			createdAt: new Date().toISOString(),
			hasError: false,
			error: null,
			errorMessage: null,
			data: undefined,
			ok: true
		}
	}

	async logout(): Promise<Response<void>> {
		// stub - implementar logout
		return {
			createdAt: new Date().toISOString(),
			hasError: false,
			error: null,
			errorMessage: null,
			data: undefined,
			ok: true
		}
	}
}
