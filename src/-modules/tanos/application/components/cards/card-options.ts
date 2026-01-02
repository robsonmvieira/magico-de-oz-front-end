import { PencilRuler, Rss, SquarePlay } from 'lucide-react'

export const cardOptions = [
	{
		id: 'vsl',
		icon: SquarePlay,
		title: 'VSL Creator',
		description: 'Design your new LATAM VSL with our AI.',
		enabled: true
	},
	{
		id: 'social-media',
		icon: Rss,
		title: 'Social Media',
		description: 'Build your Social Media Content with our AI.',
		enabled: false
	},
	{
		id: 'copy',
		icon: PencilRuler,
		title: 'Copy Writer',
		description: 'Build your copy with our AI.',
		enabled: false
	}
] as const

export type CardId = (typeof cardOptions)[number]['id']
