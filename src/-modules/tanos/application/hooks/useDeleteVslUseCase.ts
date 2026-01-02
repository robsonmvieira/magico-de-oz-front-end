import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import { VSLRepository } from '../../infra/VSLRepository'
import { DeleteVslUseCase } from '../use-cases/delete-vsl'

export function useDeleteVslUseCase() {
	const { http } = useDeps()

	const deleteVsl = useMemo(() => {
		const repository = new VSLRepository(http)
		return new DeleteVslUseCase(repository)
	}, [http])

	return {
		deleteVsl
	}
}
