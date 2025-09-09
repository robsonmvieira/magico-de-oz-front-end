export type RequestOptions = {
	searchParams?: Record<string, unknown>
	headers?: Record<string, string>
	json?: unknown
}

export interface HttpClient {
	get<T>(url: string, options?: RequestOptions): Promise<T>
	post<T>(url: string, options?: RequestOptions): Promise<T>
	put<T>(url: string, options?: RequestOptions): Promise<T>
	patch<T>(url: string, options?: RequestOptions): Promise<T>
	delete<T>(url: string, options?: RequestOptions): Promise<T>
}


