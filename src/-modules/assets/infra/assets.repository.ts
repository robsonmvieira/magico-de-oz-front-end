import type { HttpClient } from '@/-modules/shared/infra/http/http-client'
import { BaseRepository } from '@/-modules/shared/infra/repositories/base.repository'

export type Asset = {
	id: string
	url: string
	title: string
	is_favorite: boolean
	file_url: string
	status: string
	error_message: string | null
	pdf_key: string
	created_at: string
	updated_at: string | null
}

export type CreateAssetInput = { url: string }
export type UpdateFavoriteInput = { is_favorite: boolean }

export class AssetsRepository extends BaseRepository {
	constructor(http: HttpClient) {
		super(http, 'agents/content-scrapped')
	}
	async updateFavorite(id: string, is_favorite: boolean) {
		return this.update<Asset>(id, { is_favorite })
	}
}
