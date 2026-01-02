import type { Response } from '../../domain/classes'
import type { HttpClient, RequestOptions } from '../http/http-client'

export abstract class BaseRepository {
	constructor(
		protected readonly http: HttpClient,
		protected readonly baseUrl: string
	) {}

	async list<T>(options?: RequestOptions): Promise<Response<T>> {
		return this.http.get<T>(this.baseUrl, options)
	}

	async create<T>(data: unknown): Promise<Response<T>> {
		return this.http.post<T>(this.baseUrl, { json: data })
	}

	async update<T>(id: string, data: unknown): Promise<Response<T>> {
		return this.http.put<T>(`${this.baseUrl}/${id}`, { json: data })
	}

	async patch<T>(id: string, data: unknown): Promise<Response<T>> {
		return this.http.patch<T>(`${this.baseUrl}/${id}`, { json: data })
	}

	async remove<T>(id: string): Promise<Response<T>> {
		return this.http.delete<T>(`${this.baseUrl}/${id}`, {})
	}

	async getById<T>(id: string): Promise<Response<T>> {
		return this.http.get<T>(`${this.baseUrl}/${id}`, {})
	}
}
