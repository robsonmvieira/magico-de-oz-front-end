import { useToast } from '../hooks/useToast'

export function ToastExample() {
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
		<div className='p-4 space-y-4'>
			<h2 className='text-xl font-bold'>Toast Examples</h2>
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
	)
}
