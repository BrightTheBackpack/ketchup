import puppeteer from 'puppeteer';
import fs from 'fs/promises'; 
console.dir(process.argv);

function removeLastWords(str, n) {
    const words = str.split(" ");
    if (words.length <= n) {
      return ""; // Or handle the case where n is greater than or equal to the number of words as needed
    }
    const remainingWords = words.slice(0, words.length - n);
    return remainingWords.join(" ");
}

async function getStores(){
    let alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log('Browser opened');
    const result = {};

    await page.goto('https://developer.chrome.com/');
    for(let letter in alpha){
        const page = await browser.newPage();  
        await page.goto('https://couponfollow.com/site/browse/' + alpha[letter]);
        const ulSelector = 'ul.stores-list'; // Replace '#your-ul-id' with the actual ID or class of your <ul>

        // Extract text content of each <li> element
        const items = await page.$$eval(ulSelector, (ulElements) => {
            const data = [];
            ulElements.forEach((ul) => {
                Array.from(ul.querySelectorAll('li')).forEach((li) => {
                    const anchor = li.querySelector('a');
                    const name = li.textContent.replace(/\s+/g, ' ').trim();
                    const site = anchor ? anchor.href : null;
                    if (site) {
                        // Extract the domain from the URL
                        const domainMatch = site.match(/site\/([^/]+)/);
                        const domain = domainMatch ? domainMatch[1] : null;
                        const file = name.toLowerCase().replace(/\s/g,'').replace(/[^\w\s]/gi, '')
                        + '.json';

                        data.push({ domain, name, site, file });
                    }
                });
            });
            return data;
        });

        // Build the desired JSON format
        items.forEach(({ domain, name, site, file }) => {
            result[domain] = { name, site, file };
        });

      
        // console.log(items); // Outputs the list of text content from the <li> elements
    }
    const filePath = './coupons.json';
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Results saved to ${filePath}`);
browser.close();
    return result

}
async function getCoupons(stores = "all"){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log('Browser opened');
    const result = {};
    let storeData = await fs.readFile('./coupons.json', 'utf-8');
    storeData = JSON.parse(storeData);
    
}
if(process.argv.includes('stores')){
    const stores = await getStores()
    console.log(stores)
}
