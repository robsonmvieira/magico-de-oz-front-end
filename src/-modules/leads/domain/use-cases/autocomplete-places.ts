import type { Response } from '@/-modules/shared/domain/classes'
import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { LeadsRepository } from '../../infra/leads.repository'
import type {
	AutocompleteInput,
	AutocompletePlace
} from '../types/autocomplete'

type Input = AutocompleteInput
type Output = Response<AutocompletePlace[]>

export class AutocompletePlacesUseCase implements UseCase<Input, Output> {
	constructor(private readonly repo: LeadsRepository) {}

	execute(input: Input): Promise<Output> {
		return this.repo.autocomplete(input)
	}
}
