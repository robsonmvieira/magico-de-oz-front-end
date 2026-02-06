export interface LeadAddress {
	city: string
	state: string
	street: string
	zipCode: string
	latitude?: number
	longitude?: number
	neighborhood: string
}

export interface LeadEnrichmentSource {
	enriched: boolean
	at?: string
}

export interface LeadEnrichmentStatus {
	apollo: LeadEnrichmentSource
	cnpjWs: LeadEnrichmentSource
	hunter: LeadEnrichmentSource
	linkedin: LeadEnrichmentSource
	googleMaps: LeadEnrichmentSource
}

export interface LeadScore {
	icpFit: number
	engagement: number
	completeness: number
}

export interface LeadGoogleMapsData {
	rating: number
	placeId: string
	category: string
	reviewsCount: number
}

export interface LeadCnpjWsPartner {
	name: string
	qualification: string
}

export interface LeadCnpjWsData {
	cnpj: string
	capital: number
	partners: LeadCnpjWsPartner[]
	openingDate: string
	businessName: string
}

export interface LeadDecisionMaker {
	name: string
	position?: string
	email?: string
	phone?: string
}

export type LeadTemperature = 'cold' | 'warm' | 'hot'
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
export type LeadSource = 'google_maps' | 'manual' | 'import' | 'api' | 'receita_federal'

export interface Lead {
	id: string
	leadCategoryId: string
	companyName: string
	tradeName: string
	phone: string
	website?: string
	address: LeadAddress
	decisionMakers: LeadDecisionMaker[]
	enrichmentStatus: LeadEnrichmentStatus
	score: LeadScore
	temperature: LeadTemperature
	stage: LeadStage
	source: LeadSource
	googleMapsData?: LeadGoogleMapsData
	cnpjWsData?: LeadCnpjWsData
	createdAt: string
	updatedAt: string
}

