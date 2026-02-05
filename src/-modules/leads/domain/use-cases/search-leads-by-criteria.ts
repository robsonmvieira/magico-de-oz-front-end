import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { LeadsRepository } from '../../infra/leads.repository'
import type { SearchLeadsData, SearchLeadsInput } from '../types/search-leads'

type Input = SearchLeadsInput
type Output = Response<SearchLeadsData>

export class SearchLeadsByCriteriaUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: LeadsRepository) {}

	execute(input: Input): Promise<Output> {
		return this.repo.searchByCriteria(input)
	}
}
