import {
	createDrawerSelectors,
	createDrawerStore
} from '@/-modules/shared/infra/store/create-drawer-store'
import type { VSL } from '../../domain/entities/vsl.entity'

// Store principal usando a factory genérica
export const useVslStore = createDrawerStore<VSL>('vsl-store')

// Criar selectors customizados
const selectors = createDrawerSelectors(useVslStore)

// Exportar selectors com nomes específicos do domínio
export const useVsls = selectors.useItems
export const useSelectedVsl = selectors.useSelectedItem
export const useVslLoading = selectors.useLoading
export const useVslError = selectors.useError
export const useVslDrawerState = selectors.useDrawerState
export const useStoreVslActions = selectors.useActions

// Re-exportar tipo da store para compatibilidade
export type VSLState = ReturnType<typeof useVslStore.getState>
