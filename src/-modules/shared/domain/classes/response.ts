export type Response<T> = {
  created_at: string
  has_error: boolean
  error: string | null
  error_message: string | null
  data: T  | null
  success: boolean | null
}
