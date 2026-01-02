import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

// Example component for testing
function ExampleComponent({ name }: { name: string }) {
	return (
		<div>
			<h1>Hello, {name}!</h1>
		</div>
	)
}

describe('ExampleComponent', () => {
	it('should render the component with the correct name', () => {
		render(<ExampleComponent name="World" />)

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello, World!')
	})

	it('should render with a different name', () => {
		render(<ExampleComponent name="Vitest" />)

		expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument()
	})
})

describe('Math operations', () => {
	it('should add two numbers correctly', () => {
		expect(1 + 1).toBe(2)
	})

	it('should multiply numbers correctly', () => {
		expect(5 * 3).toBe(15)
	})
})
