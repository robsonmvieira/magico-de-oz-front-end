import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { DeleteAssetsUseCase } from '../../domain/use-cases/delete-assets'
import { AssetsRepository } from '../../infra/assets.repository'

export function useDeleteAssetUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new AssetsRepository(http)

		return {
			deleteAsset: new DeleteAssetsUseCase(repository)
		}
	}, [http])
}
