const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/chrome');
const path = require('path');
const options = new firefox.Options();
options.addArguments('headless');
options.addArguments('disable-gpu'); // Optional, but recommended for headless mode
const prefs = new webdriver.logging.Preferences();
prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs)

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

(async function(){
    const filePath = `file://${path.join(__dirname, `webpage-${process.argv[process.argv.length - 1]}.html`)}`;
    console.log(filePath)
    await driver.get(filePath);
    await driver.sleep(2000);

    const logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER);
    logs.forEach(log => console.log(log.message));
})();
