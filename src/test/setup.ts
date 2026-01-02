import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Polyfill React.act for React 19 compatibility
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Mock React.act since React 19 moved it
vi.mock('react', async () => {
	const actual = await vi.importActual<typeof import('react')>('react')
	return {
		...actual,
		act: actual.act || ((callback: () => void) => callback())
	}
})

// Cleanup after each test
afterEach(() => {
	cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {}, // deprecated
		removeListener: () => {}, // deprecated
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => {}
	})
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return []
	}
	unobserve() {}
} as any
