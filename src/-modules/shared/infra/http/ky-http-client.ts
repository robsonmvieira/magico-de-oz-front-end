import { http } from '../https/ky.http'
import type { HttpClient, RequestOptions } from './http-client'

export class KyHttpClient implements HttpClient {
	private mapOptions(options?: RequestOptions) {
		return {
			searchParams: options?.searchParams,
			headers: options?.headers,
			json: options?.json
		}
	}

	async get<T>(url: string, options?: RequestOptions): Promise<T> {
		return http.get(url, this.mapOptions(options)).json<T>()
	}

	async post<T>(url: string, options?: RequestOptions): Promise<T> {
		return http.post(url, this.mapOptions(options)).json<T>()
	}

	async put<T>(url: string, options?: RequestOptions): Promise<T> {
		return http.put(url, this.mapOptions(options)).json<T>()
	}

	async patch<T>(url: string, options?: RequestOptions): Promise<T> {
		return http.patch(url, this.mapOptions(options)).json<T>()
	}

	async delete<T>(url: string, options?: RequestOptions): Promise<T> {
		return http.delete(url, this.mapOptions(options)).json<T>()
	}
}
