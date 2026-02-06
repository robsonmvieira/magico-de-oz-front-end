export interface SearchLeadsInput {
	term?: string
	foundationYear?: string
	keywords?: string
}

export interface LeadAddress {
	street: string
	number: string
	complement: string | null
	neighborhood: string
	zipCode: string
	city: string
	state: string
	country: string | null
}

export interface LeadPartner {
	name: string
	doc: string
	qualification: string
}

export interface SearchLeadResult {
	source: string
	existsAsLead: boolean
	basicCnpj: string
	fullCnpj: string
	cnpjOrder: string
	cnpjDv: string
	companyName: string
	tradeName: string
	legalNatureCode: string
	socialCapital: string
	companySize: string
	registrationStatus: string
	activityStartDate: string
	mainCnae: string
	sector: string
	phone: string
	email: string
	address: LeadAddress
	partners: LeadPartner[]
}

export interface SearchLeadsData {
	results: SearchLeadResult[]
	total: number
	hasMore: boolean
}

export interface SearchLeadsResponse {
	createdAt: string
	hasError: boolean
	data: SearchLeadsData
	error: string | null
	ok: boolean
	statusCode: number
}

export interface CreateLeadsFromCriteriaInput {
	leads: SearchLeadResult[]
}

export interface CreateLeadsFromCriteriaData {
	createdCount: number
	skippedCount: number
}
