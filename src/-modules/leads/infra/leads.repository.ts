import type { Response } from '@/-modules/shared/domain/classes'
import type { HttpClient } from '@/-modules/shared/infra/http/http-client'
import type {
	AutocompleteInput,
	AutocompletePlace
} from '../domain/types/autocomplete'
import type {
	CreateLeadsFromCriteriaData,
	CreateLeadsFromCriteriaInput,
	SearchLeadsData,
	SearchLeadsInput
} from '../domain/types/search-leads'

export class LeadsRepository {
	constructor(private readonly http: HttpClient) {}

	async autocomplete(
		input: AutocompleteInput
	): Promise<Response<AutocompletePlace[]>> {
		const searchParams: Record<string, string> = {
			query: input.query,
			country: input.country ?? 'br'
		}

		if (input.location) {
			searchParams.location = input.location
		}

		return this.http.get<AutocompletePlace[]>('crm/leads/autocomplete', {
			searchParams
		})
	}

	async searchByCriteria(
		input: SearchLeadsInput
	): Promise<Response<SearchLeadsData>> {
		const advancedFilter: Record<string, string> = {}

		if (input.term) {
			advancedFilter.term = input.term
		}

		if (input.foundationYear) {
			advancedFilter.foundationYear = input.foundationYear
		}

		if (input.keywords) {
			advancedFilter.keywords = input.keywords
		}

		return this.http.post<SearchLeadsData>('crm/leads/search-by-criteria', {
			json: { advancedFilter }
		})
	}

	async createFromCriteria(
		input: CreateLeadsFromCriteriaInput
	): Promise<Response<CreateLeadsFromCriteriaData>> {
		return this.http.post<CreateLeadsFromCriteriaData>(
			'crm/leads/create-from-criteria',
			{
				json: { leads: input.leads }
			}
		)
	}
}
