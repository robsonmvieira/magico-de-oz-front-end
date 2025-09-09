import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { Asset, AssetsRepository } from '../../infra/assets.repository'

type Input = { page?: number }
type Output = { items: Asset[] }

export class ListAssetsUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: AssetsRepository) {}

	execute(input: Input) {
		return this.repo.list(input)
	}
}
