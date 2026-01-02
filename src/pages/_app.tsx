import { createFileRoute } from '@tanstack/react-router'
import { SidebarComponent } from '@/-modules/dashboard/application/components/Sibebar'

export const Route = createFileRoute('/_app')({
	component: LayoutComponent
})

function LayoutComponent() {
	return (
		<div className='app-layout'>
			<SidebarComponent />
			{/* O conteúdo das rotas será renderizado dentro do SidebarInset */}
		</div>
	)
}
