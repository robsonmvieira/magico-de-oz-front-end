export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastOptions = {
  title?: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export type ToastProps = {
  type: ToastType
  message: string
  options?: ToastOptions
}
