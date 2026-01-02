import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { VSLRepository } from '../../infra/VSLRepository'
import { UpdateFavoriteVslUseCase } from '../use-cases/update-favorite-vsl'

export function useUpdateFavoriteVslUseCase() {
	const { http } = useDeps()

	const updateFavorite = useMemo(() => {
		const repository = new VSLRepository(http)
		return new UpdateFavoriteVslUseCase(repository)
	}, [http])

	return {
		updateFavorite
	}
}
