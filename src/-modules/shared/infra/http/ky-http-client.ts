import { http } from '../https/ky.http'
import type { HttpClient, RequestOptions } from './http-client'
import type { Response } from '../../domain/classes'

export class KyHttpClient implements HttpClient {
	private mapOptions(options?: RequestOptions) {
		const mapped: any = {
			headers: options?.headers,
			json: options?.json
		}

		if (options?.searchParams) {
			mapped.searchParams = new URLSearchParams(
				Object.entries(options.searchParams).map(([key, value]) => [
					key,
					String(value)
				])
			)
		}

		return mapped
	}

	async get<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
		return http.get(url, this.mapOptions(options)).json<Response<T>>()
	}

	async post<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
		return http.post(url, this.mapOptions(options)).json<Response<T>>()
	}

	async put<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
		return http.put(url, this.mapOptions(options)).json<Response<T>>()
	}

	async patch<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
		return http.patch(url, this.mapOptions(options)).json<Response<T>>()
	}

	async delete<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
		return http.delete(url, this.mapOptions(options)).json<Response<T>>()
	}
}
