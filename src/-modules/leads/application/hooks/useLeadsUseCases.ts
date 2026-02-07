import { useMemo } from 'react'
import { useDeps } from '@/-modules/shared/infra/di/deps'
import {
	AutocompletePlacesUseCase,
	CreateLeadsFromCriteriaUseCase,
	DeleteLeadUseCase,
	ListLeadsUseCase,
	SearchLeadsByCriteriaUseCase
} from '../../domain/use-cases'
import { LeadsRepository } from '../../infra/leads.repository'

export function useLeadsUseCases() {
	const { http } = useDeps()

	return useMemo(() => {
		const repository = new LeadsRepository(http)

		return {
			autocompletePlaces: new AutocompletePlacesUseCase(repository),
			createLeadsFromCriteria: new CreateLeadsFromCriteriaUseCase(repository),
			deleteLead: new DeleteLeadUseCase(repository),
			listLeads: new ListLeadsUseCase(repository),
			searchLeadsByCriteria: new SearchLeadsByCriteriaUseCase(repository)
		}
	}, [http])
}
