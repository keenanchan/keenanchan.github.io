import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('header links reach every page and brand returns home', async ({ page, isMobile }) => {
    await page.goto('/');
    for (const [label, heading] of [
      ['About', 'About'],
      ['Projects', 'Projects'],
      ['Contact', 'Contact'],
    ] as const) {
      if (isMobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
      await page.getByRole('navigation').getByRole('link', { name: label }).click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    }
    await page.getByRole('link', { name: 'Keenan Chan' }).click();
    await expect(page).toHaveURL('/');
  });

  test('current page is marked in the nav', async ({ page, isMobile }) => {
    test.skip(isMobile, 'nav links hidden behind menu; aria-current covered on desktop');
    await page.goto('/about');
    await expect(
      page.getByRole('navigation').getByRole('link', { name: 'About' })
    ).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('mobile menu', () => {
  test('menu is collapsed by default and toggles open', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only behavior');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Toggle menu' });
    const aboutLink = page.getByRole('navigation').getByRole('link', { name: 'About' });

    await expect(button).toBeVisible();
    await expect(aboutLink).toBeHidden();

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(aboutLink).toBeVisible();

    await button.click();
    await expect(aboutLink).toBeHidden();
  });

  test('hamburger is not shown on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop-only behavior');
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeHidden();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'About' })).toBeVisible();
  });
});

test.describe('theme', () => {
  test.use({ colorScheme: 'light' });

  test('defaults to system scheme, toggles to dark, and persists', async ({ page, isMobile }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');

    if (isMobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // background actually changes, not just the attribute (dark --bg is #101214)
    const htmlBg = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor
    );
    expect(htmlBg).toBe('rgb(16, 18, 20)');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('respects a dark system preference on first visit', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await context.close();
  });
});

test.describe('react island: copy email', () => {
  test('copies the email address to the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/contact');

    const button = page.getByTestId('copy-email');
    await expect(button).toHaveText('Copy email');
    await button.click();
    await expect(button).toHaveText('Copied!');

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('keenanjchan@gmail.com');

    // reverts after the timeout
    await expect(button).toHaveText('Copy email', { timeout: 5000 });
  });
});
