import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { VSLRepository } from '../../infra/VSLRepository'
import { CreateVslUseCase } from '../use-cases/create-vsl'

export function useCreateVslUseCase() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new VSLRepository(http)

		return {
			createAsset: new CreateVslUseCase(repository)
		}
	}, [http])
}
