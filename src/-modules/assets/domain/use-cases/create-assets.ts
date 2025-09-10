import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { AssetsRepository, Asset, CreateAssetInput } from '../../infra/assets.repository'

export type { Asset, CreateAssetInput }
type Output = Response<Asset>

export class CreateAssetUseCase implements UseCase<CreateAssetInput, Output> {
	constructor(private readonly repo: AssetsRepository) {}

	execute(input: CreateAssetInput): Promise<Output> {
		return this.repo.create<Asset>(input)
	}
}
