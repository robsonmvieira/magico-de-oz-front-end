import { useAssetDrawer, useAssetStore } from '../hooks'

/**
 * Exemplo de como usar a store Zustand para assets
 */
export function AssetStoreExample() {
	// Hook principal - integra store com React Query
	const { assets, selectedAsset, isLoading, error } = useAssetStore()

	// Hook específico para drawer
	const { isOpen, pendingUrl, openDrawer, closeDrawer } = useAssetDrawer()

	return (
		<div className='p-4 space-y-4'>
			<h2 className='text-xl font-bold'>Asset Store Example</h2>

			{/* Estado dos assets */}
			<div>
				<h3 className='font-semibold'>Assets ({assets.length})</h3>
				{isLoading && <p>Carregando...</p>}
				{error && <p className='text-red-500'>Erro: {error}</p>}
				<ul className='list-disc list-inside'>
					{assets.map(asset => (
						<li key={asset.id}>
							{asset.title} - {asset.status}
						</li>
					))}
				</ul>
			</div>

			{/* Asset selecionado */}
			{selectedAsset && (
				<div>
					<h3 className='font-semibold'>Asset Selecionado</h3>
					<p>{selectedAsset.title}</p>
				</div>
			)}

			{/* Estado do drawer */}
			<div>
				<h3 className='font-semibold'>Drawer State</h3>
				<p>Drawer aberto: {isOpen ? 'Sim' : 'Não'}</p>
				{pendingUrl && <p>URL pendente: {pendingUrl}</p>}
			</div>

			{/* Botões de exemplo */}
			<div className='space-x-2'>
				<button
					onClick={() => openDrawer('https://example.com')}
					className='px-4 py-2 bg-blue-500 text-white rounded'
				>
					Abrir Drawer
				</button>
				<button
					onClick={closeDrawer}
					className='px-4 py-2 bg-gray-500 text-white rounded'
				>
					Fechar Drawer
				</button>
			</div>
		</div>
	)
}
