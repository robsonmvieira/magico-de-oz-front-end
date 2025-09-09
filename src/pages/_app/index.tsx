import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
	component: Index
})

function Index() {
	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-3xl font-bold text-primary-900'>Dashboard</h1>

			{/* Teste das cores Primary */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				<div className='bg-primary-50 p-4 rounded-lg border'>
					<h3 className='font-semibold text-primary-900'>Primary 50</h3>
					<p className='text-primary-700'>Background claro</p>
				</div>
				<div className='bg-primary-100 p-4 rounded-lg border'>
					<h3 className='font-semibold text-primary-900'>Primary 100</h3>
					<p className='text-primary-700'>Background muted</p>
				</div>
				<div className='bg-primary-200 p-4 rounded-lg border'>
					<h3 className='font-semibold text-primary-900'>Primary 200</h3>
					<p className='text-primary-700'>Accent/Highlight</p>
				</div>
				<div className='bg-primary-300 p-4 rounded-lg border'>
					<h3 className='font-semibold text-primary-900'>Primary 300</h3>
					<p className='text-primary-700'>Hover states</p>
				</div>
				<div className='bg-primary-400 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 400</h3>
					<p className='text-primary-100'>Light variant</p>
				</div>
				<div className='bg-primary-500 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 500</h3>
					<p className='text-primary-100'>Cor principal</p>
				</div>
				<div className='bg-primary-600 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 600</h3>
					<p className='text-primary-100'>Dark variant</p>
				</div>
				<div className='bg-primary-700 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 700</h3>
					<p className='text-primary-100'>Text emphasis</p>
				</div>
				<div className='bg-primary-800 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 800</h3>
					<p className='text-primary-100'>Strong emphasis</p>
				</div>
				<div className='bg-primary-900 p-4 rounded-lg border'>
					<h3 className='font-semibold text-white'>Primary 900</h3>
					<p className='text-primary-100'>Maximum contrast</p>
				</div>
			</div>

			{/* Teste de texto com cores */}
			<div className='space-y-2'>
				<p className='text-primary-900 font-semibold'>
					Texto Primary 900 (mais escuro)
				</p>
				<p className='text-primary-800 font-semibold'>Texto Primary 800</p>
				<p className='text-primary-700 font-semibold'>Texto Primary 700</p>
				<p className='text-primary-600 font-semibold'>Texto Primary 600</p>
				<p className='text-primary-500 font-semibold'>
					Texto Primary 500 (cor principal)
				</p>
			</div>

			{/* Teste das cores Greyscale */}
			<h2 className='text-2xl font-bold text-greyscale-800 mt-8 mb-4'>
				Cores Greyscale
			</h2>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				<div className='bg-greyscale-0 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 0</h3>
					<p className='text-greyscale-600'>Branco puro</p>
				</div>
				<div className='bg-greyscale-5 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 5</h3>
					<p className='text-greyscale-600'>Background claro</p>
				</div>
				<div className='bg-greyscale-25 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 25</h3>
					<p className='text-greyscale-600'>Background sutil</p>
				</div>
				<div className='bg-greyscale-50 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 50</h3>
					<p className='text-greyscale-600'>Background muted</p>
				</div>
				<div className='bg-greyscale-100 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 100</h3>
					<p className='text-greyscale-600'>Bordas sutis</p>
				</div>
				<div className='bg-greyscale-200 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 200</h3>
					<p className='text-greyscale-600'>Bordas médias</p>
				</div>
				<div className='bg-greyscale-300 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 300</h3>
					<p className='text-greyscale-600'>Texto secundário</p>
				</div>
				<div className='bg-greyscale-400 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-greyscale-800'>Greyscale 400</h3>
					<p className='text-greyscale-600'>Texto muted</p>
				</div>
				<div className='bg-greyscale-500 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-white'>Greyscale 500</h3>
					<p className='text-greyscale-100'>Cor principal</p>
				</div>
				<div className='bg-greyscale-600 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-white'>Greyscale 600</h3>
					<p className='text-greyscale-100'>Texto forte</p>
				</div>
				<div className='bg-greyscale-700 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-white'>Greyscale 700</h3>
					<p className='text-greyscale-100'>Texto principal</p>
				</div>
				<div className='bg-greyscale-800 p-4 rounded-lg border border-greyscale-200'>
					<h3 className='font-semibold text-white'>Greyscale 800</h3>
					<p className='text-greyscale-100'>Texto mais escuro</p>
				</div>
			</div>

			{/* Teste de texto com cores Greyscale */}
			<div className='space-y-2 mt-6'>
				<p className='text-greyscale-800 font-semibold'>
					Texto Greyscale 800 (mais escuro)
				</p>
				<p className='text-greyscale-700 font-semibold'>Texto Greyscale 700</p>
				<p className='text-greyscale-600 font-semibold'>Texto Greyscale 600</p>
				<p className='text-greyscale-500 font-semibold'>
					Texto Greyscale 500 (cor principal)
				</p>
				<p className='text-greyscale-400 font-semibold'>
					Texto Greyscale 400 (secundário)
				</p>
			</div>
		</div>
	)
}
