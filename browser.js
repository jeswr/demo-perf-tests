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

    if (process.env.CUSTOM_BINARY === true || process.env.CUSTOM_BINARY === 'true')
        options.setBinary("/snap/firefox/current/usr/lib/firefox/firefox")
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
    async function fetchLogs() {
        const logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER);
        logs.forEach(log => console.log(`[${log.level.name}] ${log.message}`));
    }
    try {
        // const filePath = `file://${path.join(__dirname, `webpage-${process.argv[3]}-${process.argv[4]}.html`)}`;
        const filePath = `http://localhost:4975/webpage-${process.argv[3]}-${process.argv[4]}.html`;
        console.log(filePath);
        await driver.manage().setTimeouts({ script: 60 * 60 * 1000 });
        await driver.get(filePath);

        console.log('Reasoning over TimBL profile and FOAF');
        console.log(await driver.executeScript(() => perf.run()));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('DTB');
        console.log('Depth 10**1', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 1)));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('Depth 10**2', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 2)));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('Depth 10**3', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 3)));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('Depth 10**4', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 4)));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('Depth 10**5', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 5)));
        if (browserType === 'chrome') {
            await fetchLogs();
        }
        console.log('Depth 10**6', await driver.executeScript(() => perf.deepTaxonomy(process.env.EXTENDED === true || process.env.EXTENDED === 'true', 6)));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (browserType === 'chrome') {
            await fetchLogs();
        }

        await driver.quit();
    }
})();
