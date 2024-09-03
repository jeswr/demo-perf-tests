const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const path = require('path');

// Get browser type from command line arguments
const browserType = process.argv[2] || 'chrome';

let options;
if (browserType === 'chrome') {
    options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu'); // Optional, but recommended for headless mode
} else if (browserType === 'firefox') {
    options = new firefox.Options();
    options.addArguments('-headless');
    options.addArguments('-headless');
} else {
    console.error('Unsupported browser type. Use "chrome" or "firefox".');
    process.exit(1);
}

// Enable logging
const prefs = new webdriver.logging.Preferences();
prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

const driver = new webdriver.Builder()
    .forBrowser(browserType)
    .setChromeOptions(browserType === 'chrome' ? options : undefined)
    .setFirefoxOptions(browserType === 'firefox' ? options : undefined)
    .build();

(async function(){
    // Function to fetch and print logs in real-time
    async function fetchLogs() {
        const logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER);
        logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
    }

    // Continuously fetch logs every second
    const logInterval = setInterval(fetchLogs, 100);

    try {
        // const filePath = `file://${path.join(__dirname, `webpage-${process.argv[3]}-${process.argv[4]}.html`)}`;
        const filePath = `http://localhost:4975/webpage-${process.argv[3]}-${process.argv[4]}.html`;
        console.log(filePath);

        await driver.get(filePath);

        console.log('Reasoning over TimBL profile and FOAF');
        await driver.executeScript(() => perf.run());
        console.log('DTB');
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 1));
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 2));
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 3));
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 4));
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 5));
        await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 6));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Clear the interval after the page has loaded
        clearInterval(logInterval);
        await fetchLogs();

        await driver.quit();
    }
})();
