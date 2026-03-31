import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // איפה נמצאים קבצי הטסטים
  testDir: './tests',

  // זמן מקסימלי לכל טסט (30 שניות)
  timeout: 30_000,

  // מריץ טסט אחד בכל פעם (לא במקביל) — יותר קל לקרוא את הפלט
  fullyParallel: false,
  retries: 0,
  workers: 1,

  // פורמטי דיווח: רשימה בטרמינל + דוח HTML
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    // ה-URL הבסיסי — כל page.goto('/catalog') יהפוך ל-localhost:3000/catalog
    baseURL: 'https://drink-now.vercel.app',

    // headless: false = רואים את הדפדפן נפתח (טוב ללמידה)
    // headless: true  = רץ ברקע בלי חלון (מהיר יותר)
    headless: false,

    viewport: { width: 1280, height: 800 },

    // צילום מסך אחרי כל טסט
    screenshot: 'on',

    // וידאו + trace רק כשטסט נכשל
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
