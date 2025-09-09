import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_app/content/assets')({
	component: Assets
})

import { SidebarAssets } from '@/-modules/assets/application/components'
import {
	TabContent,
	TabOptions
} from '@/-modules/assets/application/components/tabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
export default function Assets() {
	return (
		<div className='h-full flex gap-4 overflow-hidden'>
			<Tabs defaultValue='content-scrapping' className='w-2/3 flex-1 min-h-0'>
				<TabsList>
					{TabOptions.map(tab => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.title}
						</TabsTrigger>
					))}
				</TabsList>
				<div className='flex gap-4 w-full h-full min-h-0'>
					<SidebarAssets />
					{TabContent.map(tab => (
						<TabsContent key={tab.value} value={tab.value}>
							{tab.component()}
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	)
}
Assets.displayName = 'Assets'
