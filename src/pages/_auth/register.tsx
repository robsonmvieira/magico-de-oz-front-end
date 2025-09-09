import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
	component: Register
})

function Register() {
	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-900 mb-6'>Criar conta</h2>

			<form className='space-y-4'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Nome completo
					</label>
					<input
						type='text'
						id='name'
						name='name'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='Seu nome completo'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='seu@email.com'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Senha
					</label>
					<input
						type='password'
						id='password'
						name='password'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='••••••••'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='confirmPassword'
						className='block text-sm font-medium text-gray-700 mb-1'
					>
						Confirmar senha
					</label>
					<input
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='••••••••'
						required
					/>
				</div>

				<div className='flex items-center'>
					<input
						id='terms'
						name='terms'
						type='checkbox'
						className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
						required
					/>
					<label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
						Concordo com os{' '}
						<button type='button' className='text-blue-600 hover:text-blue-500'>
							termos de uso
						</button>
					</label>
				</div>

				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
				>
					Criar conta
				</button>
			</form>

			<div className='mt-6 text-center'>
				<p className='text-sm text-gray-600'>
					Já tem uma conta?{' '}
					<button
						type='button'
						className='text-blue-600 hover:text-blue-500 font-medium'
					>
						Faça login
					</button>
				</p>
			</div>
		</div>
	)
}
