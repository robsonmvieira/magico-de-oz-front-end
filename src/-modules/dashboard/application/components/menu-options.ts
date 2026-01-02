import {
	Cog,
	// BarChart3,
	// Calendar,
	// FileText,
	Home,
	Megaphone,
	// MessageSquare,
	// PieChart,
	TextSelect,
	Users
} from 'lucide-react'

export const crmNavData = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: Home,
			isActive: true,
			items: []
		},
		{
			title: 'Campanhas',
			url: '/campaigns',
			icon: Megaphone,
			isActive: false,
			items: [
				{
					title: 'All Campaigns',
					url: '/campaigns'
				},
				{
					title: 'Schedule',
					url: '/campaigns/schedule'
				},
				{
					title: 'Importar Clientes',
					url: '/clients/import'
				}
			]
		},
		{
			title: 'Leads',
			url: '/leads',
			icon: Users,
			isActive: false,
			items: [
				{
					title: 'All leads',
					url: '/leads '
				},
				{
					title: 'New lead',
					url: '/leads/new'
				},
				{
					title: 'Import leads',
					url: '/leads/import'
				},
				{
					title: 'Tags',
					url: '/leads/tags'
				},
				{
					title: 'Segments',
					url: '/leads/segments'
				},
				{
					title: 'Groups',
					url: '/leads/groups'
				},
				{
					title: 'Survey',
					url: '/audience/survey'
				}
			]
		},
		{
			title: 'Content',
			url: '/content',
			icon: TextSelect,
			isActive: false,
			items: [
				{
					title: 'Assets',
					url: '/content/assets'
				},
				{
					title: 'All Content',
					url: '/content/all'
				},
				{
					title: 'New Content',
					url: '/content/new'
				},
				{
					title: 'Import Content',
					url: '/content/import'
				}
			]
		},
		{
			title: 'Tanos',
			url: '/tanos',
			icon: Cog,
			isActive: false,
			items: [
				{
					title: 'create with Tanos',
					url: '/tanos/tanos'
				}
			]
		}
		// {
		// 	title: 'Calendário',
		// 	url: '/calendar',
		// 	icon: Calendar,
		// 	isActive: false,
		// 	items: []
		// },
		// {
		// 	title: 'Comunicação',
		// 	url: '/communication',
		// 	icon: MessageSquare,
		// 	isActive: false,
		// 	items: [
		// 		{
		// 			title: 'E-mails',
		// 			url: '/communication/emails'
		// 		},
		// 		{
		// 			title: 'Templates',
		// 			url: '/communication/templates'
		// 		}
		// 	]
		// },
		// {
		// 	title: 'Documentos',
		// 	url: '/documents',
		// 	icon: FileText,
		// 	isActive: false,
		// 	items: [
		// 		{
		// 			title: 'Contratos',
		// 			url: '/documents/contracts'
		// 		},
		// 		{
		// 			title: 'Propostas',
		// 			url: '/documents/proposals'
		// 		}
		// 	]
		// },
		// {
		// 	title: 'Configurações',
		// 	url: '/settings',
		// 	icon: Settings,
		// 	isActive: false,
		// 	items: [
		// 		{
		// 			title: 'Perfil da Empresa',
		// 			url: '/settings/company'
		// 		},
		// 		{
		// 			title: 'Usuários',
		// 			url: '/settings/users'
		// 		},
		// 		{
		// 			title: 'Integrações',
		// 			url: '/settings/integrations'
		// 		}
		// 	]
		// }
	]
}
