import type { UseCase } from '@/-modules/shared/domain/usecase'
import type { User } from '../../domain/types'
import type { AuthRepository } from '../../infra/auth.repository'

export class GetCurrentUserUseCase implements UseCase<void, User | null> {
	constructor(private readonly repo: AuthRepository) {}
	execute(): Promise<User | null> {
		return this.repo.getCurrentUser()
	}
}
