import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { ListAssetsUseCase } from '../../domain/use-cases/list-assets'
import { AssetsRepository } from '../../infra/assets.repository'

export function useAssetsUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new AssetsRepository(http)

		return {
			listAssets: new ListAssetsUseCase(repository)
		}
	}, [http])
}
