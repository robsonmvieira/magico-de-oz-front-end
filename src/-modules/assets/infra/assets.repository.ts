import type { HttpClient } from '@/-modules/shared/infra/http/http-client';

export type Asset = { id: string; name: string }

export class AssetsRepository {
	constructor(private readonly http: HttpClient) {}

	list(params?: { page?: number }) {
		return this.http.get<{ items: Asset[] }>('assets', { searchParams: params })
	}
}


