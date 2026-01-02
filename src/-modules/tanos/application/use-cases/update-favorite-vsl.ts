import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { VSL } from '../../domain/entities/vsl.entity'
import type { VSLRepository } from '../../infra/VSLRepository'

export type UpdateFavoriteVslUseCaseInput = {
	id: string
	is_favorite: boolean
}
type Output = Response<VSL>

export class UpdateFavoriteVslUseCase
	implements UseCase<UpdateFavoriteVslUseCaseInput, Output>
{
	constructor(private readonly repo: VSLRepository) {}

	execute(input: UpdateFavoriteVslUseCaseInput): Promise<Output> {
		return this.repo.updateFavorite(input.id, input.is_favorite)
	}
}
