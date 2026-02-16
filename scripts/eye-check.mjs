import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  
  console.log('Opening page...');
  await page.goto('https://frontend-zeta-five-70.vercel.app', { waitUntil: 'networkidle' });
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: '/home/fenrir/.openclaw/workspace/projects/apprendista-del-branco/vision-check.png', fullPage: true });
  
  console.log('Screenshot saved to vision-check.png');
  await browser.close();
})();
