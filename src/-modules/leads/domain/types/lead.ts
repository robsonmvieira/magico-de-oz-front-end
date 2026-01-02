export interface Lead {
	id: string
	name: string
	company?: string
	position?: string
	email: string
	phone: string
	campaign?: string
	status: 'active' | 'inactive' | 'pending' | 'engaged'
}
