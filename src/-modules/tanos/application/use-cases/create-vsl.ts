import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { VSL } from '@/-modules/tanos/domain/entities/vsl.entity'
import type {
	CreateVSLInput,
	VSLRepository
} from '@/-modules/tanos/infra/VSLRepository'

type Output = Response<VSL>

export class CreateVslUseCase implements UseCase<CreateVSLInput, Output> {
	constructor(private readonly repo: VSLRepository) {}

	execute(input: CreateVSLInput): Promise<Output> {
		return this.repo.create<VSL>(input)
	}
}
