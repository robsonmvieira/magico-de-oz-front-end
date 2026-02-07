export const temperatureColors = {
	cold: 'bg-bluesky-0 text-bluesky-200 border-bluesky-25',
	warm: 'bg-warning-0 text-warning-100 border-warning-25',
	hot: 'bg-error-0 text-error-100 border-error-25'
} as const

export const temperatureLabels = {
	cold: 'Frio',
	warm: 'Morno',
	hot: 'Quente'
} as const

export const stageColors = {
	new: 'bg-greyscale-50 text-greyscale-500 border-greyscale-200',
	contacted: 'bg-bluesky-0 text-bluesky-200 border-bluesky-25',
	qualified: 'bg-success-0 text-success-100 border-success-25',
	proposal: 'bg-warning-0 text-warning-100 border-warning-25',
	negotiation: 'bg-primary-0 text-primary-100 border-primary-25',
	won: 'bg-success-0 text-success-100 border-success-25',
	lost: 'bg-error-0 text-error-100 border-error-25'
} as const

export const stageLabels = {
	new: 'Novo',
	contacted: 'Contactado',
	qualified: 'Qualificado',
	proposal: 'Proposta',
	negotiation: 'Negociação',
	won: 'Ganho',
	lost: 'Perdido'
} as const

export const sourceLabels = {
	google_maps: 'Google Maps',
	manual: 'Manual',
	import: 'Importação',
	api: 'API',
	receita_federal: 'Receita Federal'
} as const
