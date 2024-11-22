const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const app = express();

async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 100;
    let totalHeight = 0;
    const scrollHeight = document.body.scrollHeight;
    while (totalHeight < scrollHeight) {
      window.scrollBy(0, distance);
      totalHeight += distance;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });
}

async function scrapeProducts(page) {
  await page.waitForSelector('._75nlfW', { timeout: 30000 }); // Updated general product container selector

  const products = await page.evaluate(() => {
    const productElements = Array.from(document.querySelectorAll('._75nlfW'));

    return productElements.map((el) => {
      const titleElement = el.querySelector('.KzDlHZ');  // Selector for product title
      const priceElement = el.querySelector('._4b5DiR');  // Selector for product price
      const imageElement = el.querySelector('img');  // Image tag;  // Selector for product price
      const ratingElement = el.querySelector('._5OesEi');  // Image tag;  // Selector for product price
      const ch = el.querySelector('ul');  // Selector for product price

      const title = titleElement ? titleElement.innerText : 'Title not available';
      const price = priceElement ? priceElement.innerText : 'Price not available';
      const chh = ch ? ch.innerText : 'Ch not available';
      const rating = ratingElement ? ratingElement.innerText : 'Rating not available';
      const image = imageElement ? imageElement.getAttribute('data-src') || imageElement.src : 'Image not available';


      return { title, price,image,chh,rating };
    }).filter((product) => product.title !== 'Title not available');
  });

  return products;
}

app.get('/api/products', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-web-security',
        '--allow-insecure-localhost',
        '--disable-features=IsolateOrigins,SitePerProcess',
      ],
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.9',
    });

    console.log('Navigating to Flipkart...');
    await page.goto('https://www.flipkart.com/search?q=mobiles', { waitUntil: 'load', timeout: 90000 });

    let allProducts = [];
    let pageNumber = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      console.log(`Scraping page ${pageNumber}...`);
      await autoScroll(page);

      // Screenshot to debug page load
      await page.screenshot({ path: `screenshot_page_${pageNumber}.png` });
      console.log(`Screenshot of page ${pageNumber} saved`);

      const products = await scrapeProducts(page);
      allProducts = allProducts.concat(products);

      const nextButton = await page.$('a._1LKTO3');  // Corrected selector for pagination button
      if (nextButton) {
        console.log('Navigating to the next page...');
        await nextButton.click();
        await page.waitForTimeout(3000); // Wait for the next page to load
        pageNumber++;
      } else {
        hasNextPage = false;
      }
    }

    console.log('Scraping complete. Total products:', allProducts.length);
    await browser.close();
    res.json({ products: allProducts });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
