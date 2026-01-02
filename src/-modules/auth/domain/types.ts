export type Role = 'admin' | 'manager' | 'viewer'

// Permission is just a string for now

export type User = {
	id: string
	name: string
	email?: string
	roles: Role[]
	permissions?: string[]
}
