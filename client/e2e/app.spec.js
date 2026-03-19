// @ts-check
import { test, expect } from '@playwright/test';

const mockHealthResponse = {
  status: 'ok',
  message: 'ShopSmart Backend is running',
  timestamp: '2024-01-15T10:30:00.000Z',
};

test.describe('ShopSmart E2E Tests', () => {
  test('1 - Page loads with ShopSmart title', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('ShopSmart');
  });

  test('2 - Shows loading spinner initially before API responds', async ({ page }) => {
    // Delay the API response to observe loading state
    await page.route('**/api/health', async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const spinner = page.locator('[data-testid="loading-spinner"]');
    await expect(spinner).toBeVisible();
  });

  test('3 - Displays health status after API response', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const statusCard = page.locator('[data-testid="status-card"]');
    await expect(statusCard).toBeVisible();
  });

  test('4 - Shows correct status text', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const statusText = page.locator('[data-testid="status-text"]');
    await expect(statusText).toHaveText('Ok');
  });

  test('5 - Shows correct message text', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const messageText = page.locator('[data-testid="message-text"]');
    await expect(messageText).toContainText('ShopSmart Backend is running');
  });

  test('6 - Shows timestamp', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const timestampText = page.locator('[data-testid="timestamp-text"]');
    await expect(timestampText).toBeVisible();
    await expect(timestampText).toContainText('Timestamp:');
  });

  test('7 - Page has correct title tag', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    await expect(page).toHaveTitle('ShopSmart');
  });

  test('8 - Handles API failure and shows error state', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/');
    const errorDisplay = page.locator('[data-testid="error-display"]');
    await expect(errorDisplay).toBeVisible();
  });

  test('9 - Page has proper heading structure', async ({ page }) => {
    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    const h2 = page.locator('h2');
    await expect(h2).toHaveCount(1);
    await expect(h2).toHaveText('Backend Status');
  });

  test('10 - Page is responsive at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.route('**/api/health', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHealthResponse),
      });
    });

    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    const statusCard = page.locator('[data-testid="status-card"]');
    await expect(statusCard).toBeVisible();
  });
});
