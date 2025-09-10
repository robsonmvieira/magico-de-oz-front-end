import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { Toaster } from 'sonner'
import type { ToastType } from '../../domain/types/toast'

type ToastIconProps = {
	type: ToastType
	className?: string
}

function ToastIcon({ type, className }: Readonly<ToastIconProps>) {
	const iconProps = { className: `w-4 h-4 ${className}` }

	switch (type) {
		case 'success':
			return <CheckCircle {...iconProps} />
		case 'error':
			return <XCircle {...iconProps} />
		case 'warning':
			return <AlertTriangle {...iconProps} />
		case 'info':
			return <Info {...iconProps} />
		default:
			return <Info {...iconProps} />
	}
}

export function Toast() {
	return (
		<Toaster
			position='top-right'
			expand={true}
			richColors={false}
			closeButton={true}
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-greyscale-0 group-[.toaster]:text-greyscale-800 group-[.toaster]:border group-[.toaster]:rounded-lg group-[.toaster]:shadow-lg group-[.toaster]:p-4',
					description:
						'group-[.toast]:text-greyscale-600 group-[.toast]:text-sm group-[.toast]:leading-5 group-[.toast]:mt-1',
					title:
						'group-[.toast]:font-semibold group-[.toast]:text-greyscale-800 group-[.toast]:text-sm group-[.toast]:leading-5',
					actionButton:
						'group-[.toast]:bg-primary-500 group-[.toast]:text-greyscale-0 group-[.toast]:hover:bg-primary-600',
					cancelButton:
						'group-[.toast]:bg-greyscale-100 group-[.toast]:text-greyscale-700 group-[.toast]:hover:bg-greyscale-200',
					closeButton:
						'group-[.toast]:text-greyscale-400 group-[.toast]:hover:text-greyscale-600 group-[.toast]:transition-colors',
					success:
						'group-[.toaster]:border-success-200 group-[.toaster]:bg-success-0',
					error:
						'group-[.toaster]:border-error-200 group-[.toaster]:bg-error-0',
					warning:
						'group-[.toaster]:border-warning-200 group-[.toaster]:bg-warning-0',
					info: 'group-[.toaster]:border-info-200 group-[.toaster]:bg-info-0'
				}
			}}
		/>
	)
}

export { ToastIcon }
