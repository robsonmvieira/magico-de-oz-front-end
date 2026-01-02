import { expect, test } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
	await page.goto('/')

	// Wait for page to load
	await page.waitForLoadState('networkidle')

	// Check if page loaded
	await expect(page).toHaveTitle(/.*/i)
})

test('navigation works', async ({ page }) => {
	await page.goto('/')

	// Example: check if links are present
	const links = page.locator('a')
	await expect(links).not.toHaveCount(0)
})
