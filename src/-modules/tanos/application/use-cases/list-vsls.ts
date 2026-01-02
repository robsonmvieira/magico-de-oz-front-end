import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { VSL } from '../../domain/entities/vsl.entity'
import type { VSLRepository } from '../../infra/VSLRepository'

type Input = { page?: number }
type Output = Response<VSL[]>

export class ListVslsUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: VSLRepository) {}

	execute(input: Input): Promise<Output> {
		return this.repo.list<VSL[]>({ searchParams: input })
	}
}
