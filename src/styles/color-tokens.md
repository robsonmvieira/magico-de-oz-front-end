# Color Tokens

## Primary Color Tokens

### Cores Base

| Token | Hex | RGB | Uso |
|-------|-----|-----|-----|
| `primary-0` | `#f2fbf8` | `242, 251, 248` | Background mais claro |
| `primary-50` | `#d5f2e8` | `213, 242, 232` | Background sutil |
| `primary-100` | `#abe4d1` | `171, 228, 209` | Background muted |
| `primary-200` | `#79cfb6` | `121, 207, 182` | Accent/Highlight |
| `primary-300` | `#4db498` | `77, 180, 152` | Hover states |
| `primary-400` | `#33997f` | `51, 153, 127` | Light variant |
| `primary-500` | `#277a67` | `39, 122, 103` | **Cor principal** |
| `primary-600` | `#236355` | `35, 99, 85` | Dark variant |
| `primary-700` | `#204f45` | `32, 79, 69` | Text emphasis |
| `primary-800` | `#1e433b` | `30, 67, 59` | Strong emphasis |
| `primary-900` | `#0c2722` | `12, 39, 34` | Maximum contrast |

### Tokens Semânticos

| Token | Valor | Uso |
|-------|--------|-----|
| `primary` | `primary-500` | Cor principal da marca |
| `primary-light` | `primary-400` | Variação mais clara |
| `primary-dark` | `primary-600` | Variação mais escura |
| `primary-accent` | `primary-200` | Destaques e acentos |
| `primary-muted` | `primary-100` | Estados suaves |
| `primary-subtle` | `primary-50` | Backgrounds sutis |
| `primary-background` | `primary-0` | Background principal |

## Greyscale Color Tokens

### Cores Base

| Token | Hex | RGB | Uso |
|-------|-----|-----|-----|
| `greyscale-0` | `#ffffff` | `255, 255, 255` | Branco puro |
| `greyscale-5` | `#f9fafa` | `249, 250, 250` | Background mais claro |
| `greyscale-25` | `#f3f4f4` | `243, 244, 244` | Background sutil |
| `greyscale-50` | `#e7e9e9` | `231, 233, 233` | Background muted |
| `greyscale-100` | `#dcdede` | `220, 222, 222` | Bordas sutis |
| `greyscale-200` | `#d0d2d2` | `208, 210, 210` | Bordas médias |
| `greyscale-300` | `#adb1b1` | `173, 177, 177` | Texto secundário |
| `greyscale-400` | `#898f8f` | `137, 143, 143` | Texto muted |
| `greyscale-500` | `#666e6d` | `102, 110, 109` | **Cor principal** |
| `greyscale-600` | `#4f5857` | `79, 88, 87` | Texto forte |
| `greyscale-700` | `#2c3635` | `44, 54, 53` | Texto principal |
| `greyscale-800` | `#14201f` | `20, 32, 31` | Texto mais escuro |

### Tokens Semânticos

| Token | Valor | Uso |
|-------|--------|-----|
| `greyscale` | `greyscale-500` | Cor principal |
| `greyscale-light` | `greyscale-400` | Variante clara |
| `greyscale-dark` | `greyscale-600` | Variante escura |
| `greyscale-muted` | `greyscale-100` | Cor muted |
| `greyscale-subtle` | `greyscale-50` | Cor sutil |
| `greyscale-background` | `greyscale-0` | Background principal |

## Como Usar

### CSS Variables
```css
.my-element {
  background-color: var(--color-primary-500);
  color: var(--color-primary-0);
  border: 1px solid var(--color-greyscale-200);
}
```

### Tailwind Classes
```html
<!-- Cores Primary -->
<div class="bg-primary-500 text-primary-0">Primary</div>
<div class="bg-primary-100 text-primary-900">Muted</div>

<!-- Cores Greyscale -->
<div class="bg-greyscale-0 text-greyscale-800">Branco</div>
<div class="bg-greyscale-100 text-greyscale-700">Background sutil</div>
<div class="border-greyscale-200">Borda sutil</div>

<!-- Tokens semânticos -->
<button class="bg-primary text-primary-0">Botão Principal</button>
<div class="bg-greyscale-muted text-greyscale-700">Container Muted</div>
```

### React com Tailwind
```tsx
// Componente com cores Primary
function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary hover:bg-primary-dark text-primary-0 px-4 py-2 rounded">
      {children}
    </button>
  );
}

// Card com background sutil
function PrimaryCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-subtle border border-primary-200 p-4 rounded">
      {children}
    </div>
  );
}

// Componente com cores Greyscale
function GreyscaleCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-greyscale-0 border border-greyscale-200 p-4 rounded shadow">
      {children}
    </div>
  );
}
```

## Acessibilidade

### Primary Colors
- **Contraste Alto**: Use `primary-900` em `primary-50` ou `primary-0`
- **Contraste Médio**: Use `primary-700` em `primary-100` ou `primary-0`
- **Contraste Baixo**: Use `primary-500` em `primary-0` (apenas para elementos grandes)

### Greyscale Colors
- **Contraste Alto**: Use `greyscale-800` em `greyscale-0` ou `greyscale-5`
- **Contraste Médio**: Use `greyscale-700` em `greyscale-25` ou `greyscale-0`
- **Contraste Baixo**: Use `greyscale-600` em `greyscale-50` ou `greyscale-0`

## Exemplos de Uso

### Botões
```html
<button class="bg-primary text-primary-0">Primary</button>
<button class="bg-greyscale-100 text-greyscale-800">Secondary</button>
<button class="bg-greyscale-200 text-greyscale-700">Tertiary</button>
```

### Cards
```html
<div class="bg-primary-subtle border-primary-200">Card Primary</div>
<div class="bg-greyscale-0 border-greyscale-200">Card Greyscale</div>
<div class="bg-greyscale-50 border-greyscale-100">Card Muted</div>
```

### Texto
```html
<h1 class="text-primary-900">Título Principal</h1>
<h2 class="text-greyscale-800">Subtítulo</h2>
<p class="text-greyscale-700">Texto de destaque</p>
<span class="text-greyscale-500">Texto normal</span>
<span class="text-greyscale-400">Texto secundário</span>
```
