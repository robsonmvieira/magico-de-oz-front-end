import type { Response } from "../../domain/classes"

export type RequestOptions = {
	searchParams?: Record<string, unknown>
	headers?: Record<string, string>
	json?: unknown
}

export interface HttpClient {
	get<T>(url: string, options?: RequestOptions): Promise<Response<T>>
	post<T>(url: string, options?: RequestOptions): Promise<Response<T>>
	put<T>(url: string, options?: RequestOptions): Promise<Response<T>>
	patch<T>(url: string, options?: RequestOptions): Promise<Response<T>>
	delete<T>(url: string, options?: RequestOptions): Promise<Response<T>>
}


