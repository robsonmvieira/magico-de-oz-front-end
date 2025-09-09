import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_app')({
	component: AuthLayoutComponent
})

function AuthLayoutComponent() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
			{/* Container principal do auth */}
			<div className='w-full max-w-md'>
				{/* Logo/Brand */}
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>CRM System</h1>
					<p className='text-gray-600 mt-2'>Faça login para continuar</p>
				</div>

				{/* Card do formulário */}
				<div className='bg-white rounded-lg shadow-lg p-8'>
					<Outlet />
				</div>

				{/* Footer do auth */}
				<div className='text-center mt-8'>
					<p className='text-sm text-gray-500'>
						&copy; 2024 CRM System. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</div>
	)
}
