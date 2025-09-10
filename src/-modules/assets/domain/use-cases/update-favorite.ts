import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { AssetsRepository, Asset } from '../../infra/assets.repository'

export type UpdateFavoriteUseCaseInput = { 
	id: string
	is_favorite: boolean
}
type Output = Response<Asset>

export class UpdateFavoriteUseCase
	implements UseCase<UpdateFavoriteUseCaseInput, Output>
{
	constructor(private readonly repo: AssetsRepository) {}

	execute(input: UpdateFavoriteUseCaseInput): Promise<Output> {
		return this.repo.updateFavorite(input.id, input.is_favorite)
	}
}
