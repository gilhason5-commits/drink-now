import { test, expect, Page, ConsoleMessage } from '@playwright/test';

// ─── Helper: אוסף שגיאות קונסול בזמן שהדף נטען ───────────────────────────────
function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  const handler = (msg: ConsoleMessage) => {
    if (msg.type() === 'error') errors.push(msg.text());
  };
  page.on('console', handler);
  return { errors, stop: () => page.off('console', handler) };
}

// Helper: נווט לדף + המתן שהכל ייטען (כולל אנימציות Framer Motion)
async function goto(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200); // אנימציות entrance של Framer Motion
}

// Helper: גרור אלמנט לתצוגה (useInView לא מפעיל animations בלי scroll)
async function scrollTo(page: Page, selector: string) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. PAGE LOAD HEALTH — האם כל הדפים נטענים בלי שגיאות?
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('1. Page Load Health', () => {

  for (const path of ['/', '/catalog', '/bundles', '/wineries']) {
    test(`${path} — נטען בלי שגיאות קונסול`, async ({ page }) => {
      const { errors, stop } = collectConsoleErrors(page);
      await goto(page, path);
      stop();
      await page.screenshot({ path: `tests/screenshots/load${path.replace(/\//g, '-') || '-home'}.png` });
      expect(errors, `שגיאות קונסול ב-${path}:\n${errors.join('\n')}`).toHaveLength(0);
    });
  }

  test('/catalog/von-hovel-scharzhofberger-gg — מציג את היין הנכון (לא fallback)', async ({ page }) => {
    await goto(page, '/catalog/von-hovel-scharzhofberger-gg');
    await page.screenshot({ path: 'tests/screenshots/wine-detail-known.png' });
    // אם מציג fallback — הכותרת תהיה גנרית, לא שם היין הספציפי
    await expect(page.locator('h1')).toContainText('Scharzhofberger');
  });

  test('BUG #5: /catalog/slug-לא-קיים — מחזיר 200 עם fallback במקום 404', async ({ page }) => {
    const response = await page.goto('/catalog/this-wine-does-not-exist-xyz');
    await page.screenshot({ path: 'tests/screenshots/wine-detail-fallback.png' });
    // Next.js מחזיר 200 עם תוכן גנרי — לינקים שבורים הם שקטים לחלוטין
    console.warn('BUG #5: /catalog/[slug] לא קיים מחזיר HTTP 200 עם fallback במקום 404. לינקים שבורים אינם מזוהים.');
    expect(response?.status()).toBe(200);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. KEY UI ELEMENTS — האם כל הרכיבים הנכונים מוצגים?
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('2. Key UI Elements', () => {

  test('Home — hero, כרטיסי יין, מפה, מייסדים', async ({ page }) => {
    await goto(page, '/');

    // Hero
    await expect(page.locator('h1')).toContainText('The Art of');
    await expect(page.locator('text=Explore the Catalog')).toBeVisible();

    // כרטיסי יין בסקשן "The Library"
    await scrollTo(page, 'h2:has-text("The Library")');
    const wineCards = page.locator('#catalog h3.font-headline');
    expect(await wineCards.count()).toBeGreaterThanOrEqual(4);

    // מפת הטרואר — 5 פינים
    await scrollTo(page, 'h2:has-text("The Terroir Map")');
    await expect(page.locator('.cursor-pointer.absolute.z-20')).toHaveCount(5);

    // 3 מייסדים
    await scrollTo(page, 'text=Noam Jacobi');
    await expect(page.locator('text=Noam Jacobi')).toBeVisible();
    await expect(page.locator('text=Eyal Hasson')).toBeVisible();
    await expect(page.locator('text=Amir Scheinman')).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/home-founders.png' });
  });

  test('BUG #1: Home — כפתורי פילטר (Riesling, Pinot Noir, Sparkling) ללא פונקציה', async ({ page }) => {
    await goto(page, '/');
    await scrollTo(page, 'button:has-text("Riesling")');

    const countBefore = await page.locator('h3.font-headline').count();
    await page.locator('button:has-text("Riesling")').click();
    await page.waitForTimeout(500);
    const countAfter = await page.locator('h3.font-headline').count();

    console.warn(`BUG #1: כפתורי הפילטר בדף הבית (Riesling/Pinot Noir/Sparkling) אין להם onClick handler — לחיצה לא עושה כלום. כרטיסים לפני: ${countBefore}, אחרי: ${countAfter}.`);
    expect(countAfter).toBe(countBefore); // אין שינוי — זה הבאג
    await page.screenshot({ path: 'tests/screenshots/home-filter-bug.png' });
  });

  test('Catalog — שורת חיפוש, פילטר, מיון, מונה יינות', async ({ page }) => {
    await goto(page, '/catalog');
    await expect(page.locator('h1')).toContainText('Wine');
    await expect(page.locator('input[placeholder*="Search"], input[placeholder*="search"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
    await expect(page.locator('text=/\\d+ wines shown/')).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/catalog-header.png' });
  });

  test('Bundles — 4 בנדלים מוצגים', async ({ page }) => {
    await goto(page, '/bundles');
    await expect(page.locator('h2:has-text("The Seder Night")')).toBeVisible();
    await scrollTo(page, 'h2:has-text("Yassas")');
    await expect(page.locator('h2:has-text("Yassas")')).toBeVisible();
    await scrollTo(page, 'h2:has-text("The French Uncle")');
    await expect(page.locator('h2:has-text("The French Uncle")')).toBeVisible();
    await scrollTo(page, 'h2:has-text("The Connoisseur")');
    await expect(page.locator('h2:has-text("The Connoisseur")')).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/bundles-all.png' });
  });

  test('Wineries — 3 אזורים: גרמניה, צרפת, יוון', async ({ page }) => {
    await goto(page, '/wineries');
    await expect(page.locator('h2:has-text("German Estates")')).toBeVisible();
    await scrollTo(page, 'h2:has-text("French Domaines")');
    await expect(page.locator('h2:has-text("French Domaines")')).toBeVisible();
    await scrollTo(page, 'text=Greek Terroirs');
    await expect(page.locator('text=Greek Terroirs')).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/wineries-sections.png' });
  });

  test('Wine detail — breadcrumb, תמונה, WhatsApp, טעימה', async ({ page }) => {
    await goto(page, '/catalog/carlo-schmitt-kabinett');
    await expect(page.locator('nav ~ * a:has-text("Catalog"), main a:has-text("Catalog")').first()).toBeVisible();
    await expect(page.locator('img').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]')).toBeVisible();
    // פרופיל טעימה
    await expect(page.locator('section, div').filter({ hasText: /Aromas|profile|nose/i }).first()).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/wine-detail.png' });
  });

  test('BUG #2: Footer — שנת זכויות יוצרים 2024 (צריך להיות 2026)', async ({ page }) => {
    await goto(page, '/');
    await page.keyboard.press('End');
    await page.waitForTimeout(600);
    const copyrightText = await page.locator('footer p:has-text("©")').textContent();
    console.warn(`BUG #2: Footer מציג "${copyrightText?.trim()}" — השנה היא 2026.`);
    await expect(page.locator('footer p:has-text("©")')).toContainText('2024'); // מתעד את הבאג
    await page.screenshot({ path: 'tests/screenshots/footer-copyright.png' });
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// 3. INTERACTIVE FEATURES — האם האינטראקציה עובדת?
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('3. Interactive Features', () => {

  test('Catalog — חיפוש "Carlo Schmitt" מסנן תוצאות', async ({ page }) => {
    await goto(page, '/catalog');
    const search = page.locator('input[placeholder*="earch"]');
    await search.fill('Carlo Schmitt');
    await page.waitForTimeout(600);

    const countText = await page.locator('[class*="font-label"]:has-text("wines"), span:has-text("wines shown"), p:has-text("wines shown")').first().textContent()
      ?? await page.locator('text=/\\d+ wine/').first().textContent();
    const count = parseInt(countText?.match(/\d+/)?.[0] ?? '999');
    expect(count).toBeLessThan(126);
    expect(count).toBeGreaterThan(0);

    await page.screenshot({ path: 'tests/screenshots/catalog-search.png' });

    // ניקוי
    await search.clear();
    await page.waitForTimeout(600);
  });

  test('Catalog — חיפוש ללא תוצאות', async ({ page }) => {
    await goto(page, '/catalog');
    await page.locator('input[placeholder*="earch"]').fill('xxxyyy-does-not-exist');
    await page.waitForTimeout(600);
    await expect(page.locator('text=/0 wine/')).toBeVisible();
    await expect(page.locator('text=No wines match').first()).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/catalog-no-results.png' });
  });

  test('Catalog — פילטר "Sparkling" מחזיר 1 תוצאה בלבד', async ({ page }) => {
    await goto(page, '/catalog');
    const varietySelect = page.locator('select').first();
    await varietySelect.selectOption('Sparkling');
    await page.waitForTimeout(600);
    await expect(page.locator('text=/1 wine/')).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/catalog-filter-sparkling.png' });
  });

  test('Catalog — מיון Price High-Low: הראשון הכי יקר', async ({ page }) => {
    await goto(page, '/catalog');
    const sortSelect = page.locator('select').nth(1);
    await sortSelect.selectOption('Price (High-Low)');
    await page.waitForTimeout(500);
    // Ruchottes-Chambertin Grand Cru = ₪1,250 sale — היקר ביותר
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toContainText('Ruchottes');
    await page.screenshot({ path: 'tests/screenshots/catalog-sort-price.png' });
  });

  test('Catalog — מיון Vintage Oldest: הראשון 2006', async ({ page }) => {
    await goto(page, '/catalog');
    const sortSelect = page.locator('select').nth(1);
    await sortSelect.selectOption('Vintage (Oldest)');
    await page.waitForTimeout(500);
    const firstVintage = await page.locator('table tbody tr').first().locator('td').first().textContent();
    expect(firstVintage?.trim()).toBe('2006');
    await page.screenshot({ path: 'tests/screenshots/catalog-sort-vintage.png' });
  });

  test('Terroir Map — לחיצה על פין מציגה tooltip', async ({ page }) => {
    await goto(page, '/');
    await scrollTo(page, 'h2:has-text("The Terroir Map")');

    const pins = page.locator('.cursor-pointer.absolute.z-20');
    await pins.first().click(); // Mosel & Saar
    await page.waitForTimeout(400);

    await expect(page.locator('text=Mosel & Saar').first()).toBeVisible();
    await expect(page.locator('text=Carlo Schmitt').first()).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/map-tooltip-mosel.png' });

    // לחיצה על פין אחר
    await pins.nth(2).click(); // Burgundy
    await page.waitForTimeout(400);
    await expect(page.locator('text=Burgundy & Chablis').first()).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/map-tooltip-burgundy.png' });
  });

  test('Nav — active state מתעדכן בניווט', async ({ page }) => {
    await goto(page, '/');
    // הלינק הפעיל בניווט הדסקטופ (לא לוגו)
    await expect(page.locator('nav .hidden.md\\:flex a[href="/"]')).toHaveClass(/text-primary-container/);

    await page.locator('nav .hidden.md\\:flex a[href="/catalog"]').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page.locator('nav .hidden.md\\:flex a[href="/catalog"]')).toHaveClass(/text-primary-container/);
    await page.screenshot({ path: 'tests/screenshots/nav-active-catalog.png' });
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. MOBILE — iPhone 14
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('4. Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Hamburger — נפתח ונסגר', async ({ browser }) => {
    // מדמה מובייל בתוך project=desktop
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await ctx.newPage();
    await goto(mobilePage, '/');
    const hamburger = mobilePage.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();

    await hamburger.click();
    await mobilePage.waitForTimeout(300);
    // תפריט המובייל הוא div נפרד עם md:hidden — לא הניווט הדסקטופי
    await expect(mobilePage.locator('.md\\:hidden a[href="/catalog"]')).toBeVisible();
    await mobilePage.screenshot({ path: 'tests/screenshots/mobile-nav-open.png' });

    await hamburger.click();
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: 'tests/screenshots/mobile-nav-closed.png' });
    await ctx.close();
  });

  test('Catalog — מציג כרטיסים (לא טבלה) במובייל', async ({ page }) => {
    await goto(page, '/catalog');
    // טבלה אמורה להיות מוסתרת
    await expect(page.locator('table')).not.toBeVisible();
    // כרטיסי מובייל אמורים להיות גלויים
    await expect(page.locator('.md\\:hidden').first()).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/mobile-catalog.png' });
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// 5. INTERNAL LINK AUDIT — האם הלינקים עובדים?
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('5. Internal Link Audit', () => {

  test('כל דפי הניווט מחזירים HTTP 200', async ({ page }) => {
    for (const path of ['/', '/catalog', '/bundles', '/wineries']) {
      const res = await page.goto(`http://localhost:3000${path}`);
      expect(res?.status(), `${path} החזיר שגיאה`).toBe(200);
    }
  });

  test('BUG #6: Home — לינק לכרטיס Lignier שגוי (slug לא קיים)', async ({ page }) => {
    // הדף הבית מקשר ל-/catalog/lignier-chambolle
    // אבל ב-catalog/page.tsx ה-slug האמיתי הוא lignier-chambolle-2022
    await page.goto('/catalog/lignier-chambolle');
    await page.waitForTimeout(1000);
    const h1 = await page.locator('h1').first().textContent();
    console.warn(`BUG #6: /catalog/lignier-chambolle מחזיר 200 עם fallback: "${h1?.trim()}". ה-slug הנכון הוא lignier-chambolle-2022. המשתמש רואה יין גנרי.`);
    await page.screenshot({ path: 'tests/screenshots/bug-lignier-slug.png' });
  });

  test('BUG #3: Bundles — 3 מתוך 4 כפתורי Order מקשרים לאתר הבית', async ({ page }) => {
    await goto(page, '/bundles');
    const homepageLinks = page.locator('a[href="https://www.drinknow.co.il"]');
    const realPayLinks = page.locator('a[href*="pay.sumit"]');
    const homepageCount = await homepageLinks.count();
    const realCount = await realPayLinks.count();
    console.warn(`BUG #3: ${homepageCount} כפתורי "Order Now" מקשרים ל-drinknow.co.il (דף הבית) במקום לדף תשלום. רק ${realCount} בנדל עם לינק תשלום אמיתי.`);
    expect(homepageCount).toBeGreaterThan(0); // מתעד שיש לינקים שבורים
    await page.screenshot({ path: 'tests/screenshots/bug-bundle-paylinks.png' });
  });

  test('BUG #4: Wineries — DRC ו-Schloss Lieser לא קיימים בקטלוג', async ({ page }) => {
    await goto(page, '/wineries');
    await scrollTo(page, 'text=Domaine de la Roman');
    const drcLink = page.locator('a:has-text("Explore the Domaine")');
    const href = await drcLink.getAttribute('href');
    console.warn(`BUG #4: דף היקבים מציג Domaine de la Romanée-Conti ו-Château La Conseillante אבל אין להם יינות בקטלוג. הלינק "Explore the Domaine" מוביל ל-${href} (כל הקטלוג, לא DRC ספציפי).`);
    expect(href).toBe('/catalog');
    await page.screenshot({ path: 'tests/screenshots/bug-wineries-placeholder.png' });
  });

  test('BUG #7: Footer — "Shipping Policy" מקשר ל-"#"', async ({ page }) => {
    await goto(page, '/');
    await page.keyboard.press('End');
    await page.waitForTimeout(500);
    const shippingHref = await page.locator('footer a:has-text("Shipping Policy")').getAttribute('href');
    console.warn(`BUG #7: "Shipping Policy" בפוטר מקשר ל-"${shippingHref}" — אין דף מדיניות משלוח.`);
    expect(shippingHref).toBe('#');
    await page.screenshot({ path: 'tests/screenshots/bug-footer-shipping.png' });
  });

  test('Footer links — קטלוג, יקבים, בנדלים מנווטים נכון', async ({ page }) => {
    const links = [
      { text: 'Wine Catalog', path: '/catalog' },
      { text: 'Our Wineries', path: '/wineries' },
      { text: 'Holiday Bundles', path: '/bundles' },
    ];
    for (const link of links) {
      await goto(page, '/');
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.locator(`footer a:has-text("${link.text}")`).click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      expect(page.url()).toContain(link.path);
    }
  });

});
