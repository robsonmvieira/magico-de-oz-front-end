import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { VSL } from '../../domain/entities/vsl.entity'
import type { VSLRepository } from '../../infra/VSLRepository'

export type DeleteVslUseCaseInput = {
	id: string
}
type Output = Response<VSL>

export class DeleteVslUseCase
	implements UseCase<DeleteVslUseCaseInput, Output>
{
	constructor(private readonly repo: VSLRepository) {}

	execute(input: DeleteVslUseCaseInput): Promise<Output> {
		return this.repo.remove(input.id)
	}
}
