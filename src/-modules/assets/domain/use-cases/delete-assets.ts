import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { Asset, AssetsRepository } from '../../infra/assets.repository'

export type DeleteAssetsUseCaseInput = {
	id: string
}
type Output = Response<Asset>

export class DeleteAssetsUseCase
	implements UseCase<DeleteAssetsUseCaseInput, Output>
{
	constructor(private readonly repo: AssetsRepository) {}

	execute(input: DeleteAssetsUseCaseInput): Promise<Output> {
		return this.repo.remove(input.id)
	}
}
