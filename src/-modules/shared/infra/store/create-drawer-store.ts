import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { DrawerItem } from '../../domain/types/drawer-item'

/**
 * Estado genérico para controle de drawer
 */
export interface DrawerState<TItem extends DrawerItem> {
	// Estado dos itens
	items: TItem[]
	selectedItem: TItem | null
	isLoading: boolean
	error: string | null

	// Estado do drawer
	isDrawerOpen: boolean
	pendingUrl: string

	// Ações para itens
	setItems: (items: TItem[]) => void
	addItem: (item: TItem) => void
	updateItem: (id: string, updates: Partial<TItem>) => void
	removeItem: (id: string) => void
	setSelectedItem: (item: TItem | null) => void

	// Ações para loading/error
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void

	// Ações para drawer
	openDrawer: (url?: string) => void
	closeDrawer: () => void
	setPendingUrl: (url: string) => void

	// Ações combinadas
	clearState: () => void
}

/**
 * Factory function para criar uma store de drawer genérica
 * @param storeName - Nome da store para DevTools
 * @returns Hook do Zustand configurado
 */
export function createDrawerStore<TItem extends DrawerItem>(storeName: string) {
	const initialState = {
		items: [] as TItem[],
		selectedItem: null as TItem | null,
		isLoading: false,
		error: null as string | null,
		isDrawerOpen: false,
		pendingUrl: ''
	}

	return create<DrawerState<TItem>>()(
		devtools(
			set => ({
				...initialState,

				// Ações para itens
				setItems: (items: TItem[]) => set({ items }, false, 'setItems'),

				addItem: (item: TItem) =>
					set(state => ({ items: [...state.items, item] }), false, 'addItem'),

				updateItem: (id: string, updates: Partial<TItem>) =>
					set(
						state => ({
							items: state.items.map(item =>
								item.id === id ? ({ ...item, ...updates } as TItem) : item
							),
							selectedItem:
								state.selectedItem?.id === id
									? ({ ...state.selectedItem, ...updates } as TItem)
									: state.selectedItem
						}),
						false,
						'updateItem'
					),

				removeItem: (id: string) =>
					set(
						state => ({
							items: state.items.filter(item => item.id !== id),
							selectedItem:
								state.selectedItem?.id === id ? null : state.selectedItem
						}),
						false,
						'removeItem'
					),

				setSelectedItem: (item: TItem | null) =>
					set(
						{ selectedItem: item, isDrawerOpen: !!item },
						false,
						'setSelectedItem'
					),

				// Ações para loading/error
				setLoading: (isLoading: boolean) =>
					set({ isLoading }, false, 'setLoading'),

				setError: (error: string | null) => set({ error }, false, 'setError'),

				// Ações para drawer
				openDrawer: (url = '') =>
					set({ isDrawerOpen: true, pendingUrl: url }, false, 'openDrawer'),

				closeDrawer: () =>
					set({ isDrawerOpen: false, pendingUrl: '' }, false, 'closeDrawer'),

				setPendingUrl: (pendingUrl: string) =>
					set({ pendingUrl }, false, 'setPendingUrl'),

				// Ação para limpar estado
				clearState: () => set(initialState, false, 'clearState')
			}),
			{
				name: storeName,
				partialize: (state: DrawerState<TItem>) => ({
					items: state.items,
					selectedItem: state.selectedItem
				})
			}
		)
	)
}

/**
 * Helper para criar selectors customizados
 */
export function createDrawerSelectors<TItem extends DrawerItem>(
	useStore: ReturnType<typeof createDrawerStore<TItem>>
) {
	return {
		useItems: () => useStore(state => state.items),
		useSelectedItem: () => useStore(state => state.selectedItem),
		useLoading: () => useStore(state => state.isLoading),
		useError: () => useStore(state => state.error),
		useDrawerState: () =>
			useStore(state => ({
				isOpen: state.isDrawerOpen,
				pendingUrl: state.pendingUrl
			})),
		useActions: () =>
			useStore(state => ({
				setItems: state.setItems,
				addItem: state.addItem,
				updateItem: state.updateItem,
				removeItem: state.removeItem,
				setSelectedItem: state.setSelectedItem,
				setLoading: state.setLoading,
				setError: state.setError,
				openDrawer: state.openDrawer,
				closeDrawer: state.closeDrawer,
				setPendingUrl: state.setPendingUrl,
				clearState: state.clearState
			}))
	}
}
