import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { PaginationInput } from '@/-modules/shared/domain/types/pagination'
import type { LeadsRepository } from '../../infra/leads.repository'
import type { Lead } from '../types/lead'

type Input = PaginationInput | undefined
type Output = Response<Lead[]>

export class ListLeadsUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: LeadsRepository) {}

	execute(input?: PaginationInput): Promise<Output> {
		return this.repo.list(input)
	}
}
