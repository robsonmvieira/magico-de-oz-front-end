import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { Asset, AssetsRepository } from '../../infra/assets.repository'

type Input = { page?: number }
type Output = Response<Asset[]>

export class ListAssetsUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: AssetsRepository) {}

	execute(input: Input): Promise<Output> {
		return this.repo.list<Asset[]>({ searchParams: input })
	}
}
