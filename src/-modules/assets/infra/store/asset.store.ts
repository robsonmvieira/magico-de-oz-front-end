import {
	createDrawerSelectors,
	createDrawerStore
} from '@/-modules/shared/infra/store/create-drawer-store'
import type { Asset } from '../../domain/use-cases/create-assets'

// Store principal usando a factory genérica
export const useAssetStore = createDrawerStore<Asset>('asset-store')

// Criar selectors customizados
const selectors = createDrawerSelectors(useAssetStore)

// Exportar selectors com nomes específicos do domínio
export const useAssets = selectors.useItems
export const useSelectedAsset = selectors.useSelectedItem
export const useAssetLoading = selectors.useLoading
export const useAssetError = selectors.useError
export const useDrawerState = selectors.useDrawerState
export const useAssetActions = selectors.useActions

// Re-exportar tipo da store para compatibilidade
export type AssetState = ReturnType<typeof useAssetStore.getState>
