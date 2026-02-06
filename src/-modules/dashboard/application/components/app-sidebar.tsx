import { Minus, Plus } from 'lucide-react'
import Logo from '@/assets/Logo.svg'
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { crmNavData } from './menu-options'
import { SearchForm } from './search-form'

// Dados de navegação para CRM

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader className='flex flex-col'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<div className='flex items-center justify-between'>
								<a href='/' className='flex items-center gap-2'>
									<div className='text-white flex aspect-square size-8 items-center justify-center rounded-lg'>
										<img src={Logo} alt='Logo' />
									</div>
									<div className='flex flex-col gap-0.5 leading-none'>
										<span className='font-bold  text-primary-700'>
											LeadLens
										</span>
									</div>
								</a>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<div className='px-2'>
					<Button className='cursor-pointer h-9 w-full'>
						<Plus /> Nova Campanha
					</Button>
				</div>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{crmNavData.navMain.map((item, index) => {
							const IconComponent = item.icon

							if (!item.items?.length) {
								return (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											asChild
											className={cn(
												'text-greyscale-500 cursor-pointer hover:text-primary-600',
												item.isActive && 'text-primary-600 font-medium'
											)}
										>
											<a href={item.url}>
												<IconComponent className='size-4' />
												{item.title}
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							}

							return (
								<Collapsible
									key={item.url}
									defaultOpen={index === 0}
									className='group/collapsible'
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												className={cn(
													'text-greyscale-500 cursor-pointer',
													item.isActive && 'text-primary-600 font-medium'
												)}
											>
												<IconComponent className='size-4' />
												{item.title}
												<Plus className='ml-auto group-data-[state=open]/collapsible:hidden' />
												<Minus className='ml-auto group-data-[state=closed]/collapsible:hidden' />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										{item.items?.length ? (
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items.map(subItem => (
														<SidebarMenuSubItem
															key={subItem.url}
															className='cursor-pointer'
														>
															<SidebarMenuSubButton asChild>
																<a href={subItem.url}>{subItem.title}</a>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										) : null}
									</SidebarMenuItem>
								</Collapsible>
							)
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
