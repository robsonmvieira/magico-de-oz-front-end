import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forbidden')({
	component: Forbidden
})

function Forbidden() {
	return (
		<div className='min-h-[60vh] flex items-center justify-center'>
			<div className='text-center space-y-2'>
				<h1 className='text-2xl font-bold'>Acesso negado (403)</h1>
				<p className='text-sm text-greyscale-700'>
					Você não tem permissão para acessar esta página.
				</p>
			</div>
		</div>
	)
}
