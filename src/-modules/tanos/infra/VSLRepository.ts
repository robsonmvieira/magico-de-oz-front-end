import type { HttpClient } from '@/-modules/shared/infra/http/http-client'
import { BaseRepository } from '@/-modules/shared/infra/repositories/base.repository'
import type { VSL } from '../domain/entities/vsl.entity'

export type CreateVSLInput = {
	owner_name: string
	ad_url: string
	product_name: string
	inlead_url: string
	is_root_vsl?: number | undefined
	language_option: string
	root_vsl_id?: string
	video_file?: File | undefined
}
export type UpdateFavoriteInput = { is_favorite: boolean }

export class VSLRepository extends BaseRepository {
	constructor(http: HttpClient) {
		super(http, 'vsl')
	}

	async create<T>(
		input: CreateVSLInput
	): Promise<import('@/-modules/shared/domain/classes').Response<T>> {
		const formData = new FormData()

		const { video_file, root_vsl_id, ...dataFields } = input

		const cleanData = {
			...dataFields,
			...(root_vsl_id && { root_vsl_id })
		}

		formData.append('data', JSON.stringify(cleanData))

		if (video_file) {
			formData.append('video_file', video_file)
		}

		return this.http.post<T>(this.baseUrl, { body: formData })
	}

	async updateFavorite(id: string, is_favorite: boolean) {
		return this.update<VSL>(id, { is_favorite })
	}
}
