import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { LeadsRepository } from '../../infra/leads.repository'

type Input = string
type Output = Response<void>

export class DeleteLeadUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: LeadsRepository) {}

	execute(id: string): Promise<Output> {
		return this.repo.delete(id)
	}
}
