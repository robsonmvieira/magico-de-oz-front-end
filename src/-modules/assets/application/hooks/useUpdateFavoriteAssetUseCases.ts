import { useDeps } from '@/-modules/shared/infra/di/deps'
import { useMemo } from 'react'
import {
	UpdateFavoriteUseCase
} from '../../domain/use-cases/update-favorite'
import { AssetsRepository } from '../../infra/assets.repository'

export function useUpdateFavoriteAssetUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new AssetsRepository(http)

		return {
			updateFavorite: new UpdateFavoriteUseCase(repository)
		}
	}, [http])
}
