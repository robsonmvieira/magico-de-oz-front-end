import { useDeps } from '@/-modules/shared/infra/di/deps'
import { useMemo } from 'react'
import { CreateAssetUseCase } from '../../domain/use-cases/create-assets'
import { AssetsRepository } from '../../infra/assets.repository'

export function useCreateAssetUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new AssetsRepository(http)

		return {
			createAsset: new CreateAssetUseCase(repository)
		}
	}, [http])
}
