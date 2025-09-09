import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/sidebar'
import { Outlet } from '@tanstack/react-router'
import { AppSidebar } from './app-sidebar'

export function SidebarComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='bg-[var(--color-greyscale-5)]'>
				<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
					<SidebarTrigger className='-ml-1 cursor-pointer' />
					<Separator
						orientation='vertical'
						className='mr-2 data-[orientation=vertical]:h-4'
					/>
					<Breadcrumb>
						<BreadcrumbList>
							{/* <BreadcrumbItem className='hidden md:block'>
								<BreadcrumbLink href='#'>CRM Systema</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className='hidden md:block' /> */}
							<BreadcrumbItem>
								<BreadcrumbPage>Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4'>
					{/* Conteúdo das rotas renderizado aqui */}
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
