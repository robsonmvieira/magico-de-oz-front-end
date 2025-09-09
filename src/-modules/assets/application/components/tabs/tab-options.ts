import type { ReactNode } from 'react'
import { ContentScrapping } from './content-scrapping/content-scrapping'
import { CopyGenerator } from './copy/copy-generator'

interface TabOptionsProps {
	value: string
	title: string
}
interface TabContentProps {
	value: string
	component: () => ReactNode
}

export const TabOptions: TabOptionsProps[] = [
	{
		value: 'content-scrapping',
		title: 'Content Scrapping'
	},
	{
		value: 'copy',
		title: 'Copy Generator'
	}
]

export const TabContent: TabContentProps[] = [
	{
		value: 'content-scrapping',
		component: ContentScrapping
	},
	{
		value: 'copy',
		component: CopyGenerator
	}
]
