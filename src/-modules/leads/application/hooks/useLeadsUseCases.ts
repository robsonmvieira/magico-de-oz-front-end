import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import {
	AutocompletePlacesUseCase,
	SearchLeadsByCriteriaUseCase
} from '../../domain/use-cases'
import { LeadsRepository } from '../../infra/leads.repository'

export function useLeadsUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new LeadsRepository(http)

		return {
			autocompletePlaces: new AutocompletePlacesUseCase(repository),
			searchLeadsByCriteria: new SearchLeadsByCriteriaUseCase(repository)
		}
	}, [http])
}
