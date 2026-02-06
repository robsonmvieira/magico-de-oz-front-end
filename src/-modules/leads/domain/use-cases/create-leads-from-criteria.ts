import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { LeadsRepository } from '../../infra/leads.repository'
import type {
	CreateLeadsFromCriteriaData,
	CreateLeadsFromCriteriaInput
} from '../types/search-leads'

type Input = CreateLeadsFromCriteriaInput
type Output = Response<CreateLeadsFromCriteriaData>

export class CreateLeadsFromCriteriaUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: LeadsRepository) {}

	execute(input: Input): Promise<Output> {
		return this.repo.createFromCriteria(input)
	}
}
