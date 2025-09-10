import { toast } from 'sonner'
import type { ToastOptions, ToastType } from '../../domain/types/toast'
import { ToastIcon } from '../components/toast'

export function useToast() {
	const showToast = (
		type: ToastType,
		message: string,
		options?: ToastOptions
	) => {
		const getIconStyles = (toastType: ToastType) => {
			const baseStyles = 'w-6 h-6 rounded-full flex items-center justify-center'
			switch (toastType) {
				case 'success':
					return `${baseStyles} bg-success-100 text-success-600`
				case 'error':
					return `${baseStyles} bg-error-100 text-error-600`
				case 'warning':
					return `${baseStyles} bg-warning-100 text-warning-600`
				case 'info':
					return `${baseStyles} bg-info-100 text-info-600`
				default:
					return `${baseStyles} bg-info-100 text-info-600`
			}
		}

		const icon = (
			<div className={getIconStyles(type)}>
				<ToastIcon type={type} />
			</div>
		)

		switch (type) {
			case 'success':
				return toast.success(message, {
					icon,
					description: options?.description,
					duration: options?.duration || 4000,
					action: options?.action
						? {
								label: options.action.label,
								onClick: options.action.onClick
							}
						: undefined
				})

			case 'error':
				return toast.error(message, {
					icon,
					description: options?.description,
					duration: options?.duration || 6000,
					action: options?.action
						? {
								label: options.action.label,
								onClick: options.action.onClick
							}
						: undefined
				})

			case 'warning':
				return toast.warning(message, {
					icon,
					description: options?.description,
					duration: options?.duration || 5000,
					action: options?.action
						? {
								label: options.action.label,
								onClick: options.action.onClick
							}
						: undefined
				})

			case 'info':
				return toast.info(message, {
					icon,
					description: options?.description,
					duration: options?.duration || 4000,
					action: options?.action
						? {
								label: options.action.label,
								onClick: options.action.onClick
							}
						: undefined
				})

			default:
				return toast(message, {
					icon,
					description: options?.description,
					duration: options?.duration || 4000,
					action: options?.action
						? {
								label: options.action.label,
								onClick: options.action.onClick
							}
						: undefined
				})
		}
	}

	return {
		success: (message: string, options?: ToastOptions) =>
			showToast('success', message, options),
		error: (message: string, options?: ToastOptions) =>
			showToast('error', message, options),
		warning: (message: string, options?: ToastOptions) =>
			showToast('warning', message, options),
		info: (message: string, options?: ToastOptions) =>
			showToast('info', message, options),
		show: showToast
	}
}
