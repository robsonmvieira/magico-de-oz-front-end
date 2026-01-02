import { describe, expect, it } from 'vitest'

describe('Math operations', () => {
	it('should add two numbers correctly', () => {
		expect(1 + 1).toBe(2)
	})

	it('should multiply numbers correctly', () => {
		expect(5 * 3).toBe(15)
	})

	it('should handle negative numbers', () => {
		expect(-5 + 3).toBe(-2)
	})
})
