import { test, expect, type Page } from '@playwright/test';

/** Every visible image on the page actually loaded (naturalWidth > 0). */
async function expectImagesLoaded(page: Page) {
  const images = page.locator('img:visible');
  const count = await images.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    await expect(img, `image ${await img.getAttribute('src')}`).toHaveJSProperty(
      'complete',
      true
    );
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth, `image ${await img.getAttribute('src')} failed to load`).toBeGreaterThan(0);
  }
}

test.describe('home', () => {
  test('shows refreshed hero content and loaded headshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Keenan");
    await expect(page.getByText('Vancouver, BC')).toBeVisible();
    await expectImagesLoaded(page);
  });

  test('featured work links out to Medium articles', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('article.card a');
    expect(await cards.count()).toBeGreaterThanOrEqual(2);
    for (const card of await cards.all()) {
      await expect(card).toHaveAttribute('href', /medium\.com/);
      await expect(card).toHaveAttribute('rel', /noopener/);
    }
  });

  test('resume and social buttons point to the right places', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      'https://resume.keenanchan.com'
    );
    await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute(
      'href',
      'https://github.com/keenanchan'
    );
    await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
      'href',
      /^mailto:/
    );
  });
});

test.describe('about', () => {
  test('renders experience, education, and skills from data files', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About');
    // one entry from each data array proves the data files are wired up
    await expect(page.getByText('Data Analyst / Engineer II')).toBeVisible();
    await expect(page.getByText('M.S. Business Analytics')).toBeVisible();
    await expect(page.getByText('Databricks', { exact: true })).toBeVisible();
    await expectImagesLoaded(page);
  });
});

test.describe('projects', () => {
  test('lists all four projects, newest first, each linking to its article', async ({ page }) => {
    await page.goto('/projects');
    const cards = page.locator('article.card');
    await expect(cards).toHaveCount(4);

    const titles = await cards.locator('h3').allTextContents();
    expect(titles[0]).toMatch(/Fraud or fair|Enchantments/); // 2025 articles before 2024 ones
    expect(titles[3]).toMatch(/Wildfires|Baggage/);

    for (const link of await cards.locator('a').all()) {
      await expect(link).toHaveAttribute('href', /medium\.com/);
      await expect(link).toHaveAttribute('target', '_blank');
    }
    await expectImagesLoaded(page);
  });
});

test.describe('contact', () => {
  test('shows email, phone, and social links', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('link', { name: 'keenanjchan@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:keenanjchan@gmail.com'
    );
    await expect(page.getByText('(858) 888-2252')).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com/
    );
  });
});

test.describe('404', () => {
  test('unknown routes show the custom 404 page with a way home', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
    await page.getByRole('link', { name: /back home/i }).click();
    await expect(page).toHaveURL('/');
  });
});
