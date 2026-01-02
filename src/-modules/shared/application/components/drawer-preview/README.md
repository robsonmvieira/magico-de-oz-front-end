# DrawerPreviewBase - Componente Genérico de Drawer

Componente base reutilizável para drawers laterais com preview de conteúdo.

## Características

- ✅ Genérico e type-safe com TypeScript
- ✅ Suporta qualquer tipo de conteúdo via slots (children)
- ✅ Footer customizável para ações e informações
- ✅ Integrado com Zustand store genérica
- ✅ Direção configurável (padrão: direita)
- ✅ Largura customizável

## Arquitetura

```
DrawerPreviewBase (Genérico)
├── Store Genérica (createDrawerStore)
├── Content Renderer (slot via children)
├── Footer Actions (slot via footerActions)
└── Footer Info (slot via footerInfo)
```

## Como Usar

### 1. Criar Store do Módulo

```typescript
// src/-modules/seu-modulo/infra/store/seu-item.store.ts
import { createDrawerStore, createDrawerSelectors } from '@/-modules/shared/infra/store/create-drawer-store'
import type { SeuItem } from '../../domain/entities/seu-item.entity'

export const useSeuItemStore = createDrawerStore<SeuItem>('seu-item-store')

const selectors = createDrawerSelectors(useSeuItemStore)

export const useSeuItems = selectors.useItems
export const useSelectedSeuItem = selectors.useSelectedItem
export const useSeuItemActions = selectors.useActions
```

### 2. Criar Content Renderer

```typescript
// src/-modules/seu-modulo/application/components/renderers/seu-item-renderer.tsx
interface SeuItemRendererProps {
  item: SeuItem | null
  onAction: () => void
}

export function SeuItemRenderer({ item, onAction }: SeuItemRendererProps) {
  if (!item) return <div>Nenhum item selecionado</div>

  return (
    <div className="w-full h-full">
      {/* Seu conteúdo customizado aqui */}
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </div>
  )
}
```

### 3. Criar Hook de Actions

```typescript
// src/-modules/seu-modulo/application/hooks/useSeuItemDrawerActions.ts
export function useSeuItemDrawerActions({ selectedItem, onClose }) {
  const toast = useToast()
  const deleteMutation = useDeleteSeuItem()

  const handleDelete = () => {
    if (!selectedItem) return

    deleteMutation.mutate({ id: selectedItem.id }, {
      onSuccess: () => {
        toast.success('Item deletado!')
        onClose()
      }
    })
  }

  return {
    handleDelete,
    // outras actions...
  }
}
```

### 4. Usar no Componente

```typescript
import { DrawerPreviewBase } from '@/-modules/shared/application/components/drawer-preview'
import { SeuItemRenderer } from '../renderers/seu-item-renderer'
import { useSeuItemDrawerActions } from '../hooks/useSeuItemDrawerActions'
import { useSeuItemStore } from '../infra/store/seu-item.store'

export function SeuComponente() {
  const isOpen = useSeuItemStore(state => state.isDrawerOpen)
  const selectedItem = useSeuItemStore(state => state.selectedItem)
  const closeDrawer = useSeuItemStore(state => state.closeDrawer)

  const { handleDelete } = useSeuItemDrawerActions({
    selectedItem,
    onClose: closeDrawer
  })

  return (
    <DrawerPreviewBase
      isOpen={isOpen}
      onClose={closeDrawer}
      selectedItem={selectedItem}
      icon={<FileIcon className="w-10 h-10" />}
      footerInfo={<DateInfo date={selectedItem?.created_at} />}
      footerActions={
        <Button onClick={handleDelete}>Deletar</Button>
      }
    >
      <SeuItemRenderer
        item={selectedItem}
        onAction={() => {}}
      />
    </DrawerPreviewBase>
  )
}
```

## Props do DrawerPreviewBase

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `isOpen` | `boolean` | Sim | Controla se drawer está aberto |
| `onClose` | `() => void` | Sim | Callback ao fechar drawer |
| `selectedItem` | `TItem \| null` | Sim | Item selecionado (genérico) |
| `children` | `ReactNode` | Sim | Conteúdo do drawer (renderer) |
| `title` | `string` | Não | Título customizado (padrão: `selectedItem.title`) |
| `icon` | `ReactNode` | Não | Ícone do header |
| `footerActions` | `ReactNode` | Não | Botões de ação no footer |
| `footerInfo` | `ReactNode` | Não | Informações adicionais no footer |
| `width` | `string` | Não | Largura do drawer (padrão: `"800px"`) |

## Exemplos Reais

### Assets (PDF Preview)
- **Store**: [asset.store.ts](../../../../../assets/infra/store/asset.store.ts)
- **Renderer**: [asset-pdf-renderer.tsx](../../../../../assets/application/components/renderers/asset-pdf-renderer.tsx)
- **Actions**: [useAssetDrawerActions.ts](../../../../../assets/application/hooks/useAssetDrawerActions.ts)
- **Uso**: [content-scrapping.tsx](../../../../../assets/application/components/tabs/content-scrapping/content-scrapping.tsx)

### Tanos/VSL (Multi-format Preview)
- **Store**: [vsl.store.ts](../../../../../tanos/infra/store/vsl.store.ts)
- **Renderer**: [vsl-content-renderer.tsx](../../../../../tanos/application/components/renderers/vsl-content-renderer.tsx)
- **Actions**: [useVslDrawerActions.ts](../../../../../tanos/application/hooks/useVslDrawerActions.ts)

## Store Genérica - API Completa

```typescript
// Estado
state.items              // TItem[]
state.selectedItem       // TItem | null
state.isLoading          // boolean
state.error              // string | null
state.isDrawerOpen       // boolean
state.pendingUrl         // string

// Ações
state.setItems(items)                    // Define lista completa
state.addItem(item)                      // Adiciona um item
state.updateItem(id, updates)            // Atualiza item por ID
state.removeItem(id)                     // Remove item por ID
state.setSelectedItem(item)              // Seleciona item e abre drawer
state.setLoading(loading)                // Define estado de loading
state.setError(error)                    // Define mensagem de erro
state.openDrawer(url?)                   // Abre drawer
state.closeDrawer()                      // Fecha drawer
state.setPendingUrl(url)                 // Define URL pendente
state.clearState()                       // Limpa todo estado
```

## Interface Base

Todo item que será usado no drawer deve implementar `DrawerItem`:

```typescript
interface DrawerItem {
  id: string
  title: string
  created_at: string
  is_favorite?: boolean
}
```

Você pode estender essa interface no seu módulo:

```typescript
interface MeuItem extends DrawerItem {
  minhaProp: string
  outraProp: number
}
```

## Benefícios

1. **Reutilização**: Um componente para todos os módulos
2. **Consistência**: UI uniforme em toda aplicação
3. **Type-Safe**: TypeScript garante tipagem correta
4. **Manutenibilidade**: Mudanças centralizadas
5. **Testabilidade**: Componentes isolados e focados
6. **Extensibilidade**: Fácil adicionar novos módulos
