import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { VSLRepository } from '../../infra/VSLRepository'
import { ListVslsUseCase } from '../use-cases/list-vsls'

export function useVslsUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new VSLRepository(http)

		return {
			listAssets: new ListVslsUseCase(repository)
		}
	}, [http])
}
