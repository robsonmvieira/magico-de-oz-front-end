import {
	useAssetError,
	useAssetLoading,
	useAssets,
	useDrawerState,
	useSelectedAsset,
	useAssetActions as useStoreAssetActions
} from '../../infra/store/asset.store'

/**
 * Hook principal para gerenciar o estado dos assets
 * Apenas Zustand store, sem integração com React Query
 */
export function useAssetStore() {
	const assets = useAssets()
	const selectedAsset = useSelectedAsset()
	const isLoading = useAssetLoading()
	const error = useAssetError()
	const drawerState = useDrawerState()
	const actions = useStoreAssetActions()

	return {
		// Estado
		assets,
		selectedAsset,
		isLoading,
		error,
		drawerState,

		// Ações
		...actions
	}
}

/**
 * Hook específico para o drawer
 */
export function useAssetDrawer() {
	const { isOpen, pendingUrl } = useDrawerState()
	const { openDrawer, closeDrawer, setPendingUrl } = useAssetActions()

	return {
		isOpen,
		pendingUrl,
		openDrawer,
		closeDrawer,
		setPendingUrl
	}
}

/**
 * Hook para ações de asset
 */
export function useAssetActions() {
	return useStoreAssetActions()
}
