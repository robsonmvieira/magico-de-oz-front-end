import { Alert } from '../components/Alert'
import { useToast } from '../hooks/useToast'

export function AlertExample() {
	const toast = useToast()

	const handleSuccess = () => {
		toast.success('Operação realizada com sucesso!', {
			description: 'Os dados foram salvos corretamente.',
			duration: 4000
		})
	}

	const handleError = () => {
		toast.error('Erro ao processar solicitação', {
			description: 'Verifique sua conexão e tente novamente.',
			duration: 6000,
			action: {
				label: 'Tentar novamente',
				onClick: () => console.log('Retry clicked')
			}
		})
	}

	const handleWarning = () => {
		toast.warning('Atenção necessária', {
			description: 'Esta ação não pode ser desfeita.',
			duration: 5000
		})
	}

	const handleInfo = () => {
		toast.info('Informação importante', {
			description: 'Nova funcionalidade disponível.',
			duration: 4000
		})
	}

	return (
		<div className='p-6 space-y-6'>
			<h2 className='text-2xl font-bold text-greyscale-800'>
				Alert & Toast Examples
			</h2>

			{/* Static Alert Components */}
			<div className='space-y-4'>
				<h3 className='text-lg font-semibold text-greyscale-700'>
					Static Alerts
				</h3>
				<Alert
					type='info'
					title='Important!'
					description='We will use this address data later as an attachment to your email and other related campaign.'
				/>
				<Alert
					type='error'
					title='Important!'
					description='We will use this address data later as an attachment to your email and other related campaign.'
				/>
				<Alert
					type='warning'
					title='Important!'
					description='We will use this address data later as an attachment to your email and other related campaign.'
				/>
				<Alert
					type='success'
					title='Important!'
					description='We will use this address data later as an attachment to your email and other related campaign.'
				/>
			</div>

			{/* Toast Triggers */}
			<div className='space-y-4'>
				<h3 className='text-lg font-semibold text-greyscale-700'>
					Toast Triggers
				</h3>
				<div className='flex gap-2'>
					<button
						type='button'
						onClick={handleSuccess}
						className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
					>
						Success Toast
					</button>
					<button
						type='button'
						onClick={handleError}
						className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
					>
						Error Toast
					</button>
					<button
						type='button'
						onClick={handleWarning}
						className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
					>
						Warning Toast
					</button>
					<button
						type='button'
						onClick={handleInfo}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
					>
						Info Toast
					</button>
				</div>
			</div>
		</div>
	)
}
