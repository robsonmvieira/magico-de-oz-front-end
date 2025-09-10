import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import type { ToastType } from '../../domain/types/toast'

type AlertProps = {
	type: ToastType
	title: string
	description: string
	onClose?: () => void
}

function AlertIcon({ type }: Readonly<{ type: ToastType }>) {
	const iconProps = { className: 'w-5 h-5' }

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

function getAlertStyles(type: ToastType) {
	const baseStyles = 'border rounded-lg p-4 flex items-start gap-3'

	switch (type) {
		case 'success':
			return `${baseStyles} border-success-200 bg-success-0`
		case 'error':
			return `${baseStyles} border-error-200 bg-error-0`
		case 'warning':
			return `${baseStyles} border-warning-200 bg-warning-0`
		case 'info':
			return `${baseStyles} border-info-200 bg-info-0`
		default:
			return `${baseStyles} border-info-200 bg-info-0`
	}
}

function getIconStyles(type: ToastType) {
	const baseStyles =
		'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0'

	switch (type) {
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

export function Alert({
	type,
	title,
	description,
	onClose
}: Readonly<AlertProps>) {
	return (
		<div className={getAlertStyles(type)}>
			<div className={getIconStyles(type)}>
				<AlertIcon type={type} />
			</div>

			<div className='flex-1 min-w-0'>
				<h4 className='font-semibold text-greyscale-800 text-sm leading-5'>
					{title}
				</h4>
				<p className='text-greyscale-600 text-sm leading-5 mt-1'>
					{description}
				</p>
			</div>

			{onClose && (
				<button
					type='button'
					onClick={onClose}
					className='flex-shrink-0 text-greyscale-400 hover:text-greyscale-600 transition-colors'
					aria-label='Fechar alerta'
				>
					<X className='w-4 h-4' />
				</button>
			)}
		</div>
	)
}
