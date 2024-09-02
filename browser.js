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
    const filePath = `file://${path.join(__dirname, `webpage-${process.argv[3]}-${process.argv[4]}.html`)}`;
    console.log(filePath);
    await driver.get(filePath);
    await driver.sleep(2000);

    const logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER);
    logs.forEach(log => console.log(log.message));
})();
