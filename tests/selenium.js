import { Options, ServiceBuilder } from 'selenium-webdriver/chrome.js';
import { Builder, Browser, WebDriver } from 'selenium-webdriver';
import testConfig from './selenium.config.js';

/**
 * 
 * @returns {WebDriver} 
 */
export async function createSelenium() {
    let options = new Options();
    options.setBinaryPath(testConfig.BROWSER_BINARY_PATH);

    let driver = await new Builder()
        .forBrowser(testConfig.BROWSER)
        .setChromeOptions(options)
        
    driver = driver.setChromeService(new ServiceBuilder(testConfig.BROWSER_DRIVER_PATH));
    driver = driver.build();

    return driver;
}