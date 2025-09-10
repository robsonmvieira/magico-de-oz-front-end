import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Asset } from '../../domain/use-cases/create-assets'

// Tipos para a store
export interface AssetState {
  // Estado dos assets
  assets: Asset[]
  selectedAsset: Asset | null
  isLoading: boolean
  error: string | null
  
  // Estado do drawer
  isDrawerOpen: boolean
  pendingUrl: string
  
  // Ações para assets
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, updates: Partial<Asset>) => void
  removeAsset: (id: string) => void
  setSelectedAsset: (asset: Asset | null) => void
  
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

// Estado inicial
const initialState = {
  assets: [],
  selectedAsset: null,
  isLoading: false,
  error: null,
  isDrawerOpen: false,
  pendingUrl: ''
}

// Store principal
export const useAssetStore = create<AssetState>()(
  devtools(
    (set) => ({
      ...initialState,
      
      // Ações para assets
      setAssets: (assets) => set({ assets }, false, 'setAssets'),
      
      addAsset: (asset) => set(
        (state) => ({ assets: [...state.assets, asset] }),
        false,
        'addAsset'
      ),
      
      updateAsset: (id, updates) => set(
        (state) => ({
          assets: state.assets.map(asset =>
            asset.id === id ? { ...asset, ...updates } : asset
          ),
          selectedAsset: state.selectedAsset?.id === id 
            ? { ...state.selectedAsset, ...updates }
            : state.selectedAsset
        }),
        false,
        'updateAsset'
      ),
      
      removeAsset: (id) => set(
        (state) => ({
          assets: state.assets.filter(asset => asset.id !== id),
          selectedAsset: state.selectedAsset?.id === id ? null : state.selectedAsset
        }),
        false,
        'removeAsset'
      ),
      
      setSelectedAsset: (asset) => set({ selectedAsset: asset, isDrawerOpen: true }, false, 'setSelectedAsset'),
      
      // Ações para loading/error
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      
      setError: (error) => set({ error }, false, 'setError'),
      
      // Ações para drawer
      openDrawer: (url = '') => set(
        { isDrawerOpen: true, pendingUrl: url },
        false,
        'openDrawer'
      ),
      
      closeDrawer: () => set(
        { isDrawerOpen: false, pendingUrl: '' },
        false,
        'closeDrawer'
      ),
      
      setPendingUrl: (pendingUrl) => set({ pendingUrl }, false, 'setPendingUrl'),
      
      // Ação para limpar estado
      clearState: () => set(initialState, false, 'clearState')
    }),
    {
      name: 'asset-store', // Nome para o DevTools
      partialize: (state: AssetState) => ({
        // Persistir apenas assets e selectedAsset
        assets: state.assets,
        selectedAsset: state.selectedAsset
      })
    }
  )
)

// Selectors úteis
export const useAssets = () => useAssetStore((state) => state.assets)
export const useSelectedAsset = () => useAssetStore((state) => state.selectedAsset)
export const useAssetLoading = () => useAssetStore((state) => state.isLoading)
export const useAssetError = () => useAssetStore((state) => state.error)
export const useDrawerState = () => useAssetStore((state) => ({
  isOpen: state.isDrawerOpen,
  pendingUrl: state.pendingUrl
}))

// Actions
export const useAssetActions = () => useAssetStore((state) => ({
  setAssets: state.setAssets,
  addAsset: state.addAsset,
  updateAsset: state.updateAsset,
  removeAsset: state.removeAsset,
  setSelectedAsset: state.setSelectedAsset,
  setLoading: state.setLoading,
  setError: state.setError,
  openDrawer: state.openDrawer,
  closeDrawer: state.closeDrawer,
  setPendingUrl: state.setPendingUrl,
  clearState: state.clearState
}))
