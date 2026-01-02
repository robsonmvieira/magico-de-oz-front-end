import { ArrowUp } from 'lucide-react'
import type { DashboardKpiProps } from './kpi'

export const fakeCardData: DashboardKpiProps[] = [
	{
		title: 'Leads Ativos',
		value: 1.452,
		valueType: 'number',
		valueIndicator: 'up',
		valueIcon: ArrowUp
	},
	{
		title: 'Email Enviados',
		value: 1.452,
		valueType: 'number',
		valueIndicator: 'up',
		valueIcon: ArrowUp
	},
	{
		title: 'Taxa de Resposta',
		value: 1.452,
		valueType: 'percentage',
		valueIndicator: 'up',
		valueIcon: ArrowUp
	},
	{
		title: 'Reuniões Agendadas',
		value: 19,
		valueType: 'number',
		valueIndicator: 'down',
		valueIcon: ArrowUp
	}
]
