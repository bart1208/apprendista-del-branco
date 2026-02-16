import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  
  const target = process.argv[2] || 'https://frontend-zeta-five-70.vercel.app';
  const name = process.argv[3] || 'vision-check.png';

  console.log(`Opening ${target}...`);
  await page.goto(target, { waitUntil: 'networkidle' });
  
  console.log(`Taking screenshot: ${name}...`);
  await page.screenshot({ path: `/home/fenrir/.openclaw/workspace/projects/apprendista-del-branco/${name}`, fullPage: true });
  
  console.log(`Screenshot saved to ${name}`);
  await browser.close();
})();
