import { Browser } from "selenium-webdriver";

export default {
    BROWSER: Browser.CHROME,
    BROWSER_BINARY_PATH: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Path to Browser binary
    BROWSER_DRIVER_PATH: 'C:\\Users\\Kasutaja\\Desktop\\selenium\\chromedriver.exe', // Path to custom GeckoDriver
    USE_DRIVER: true // Whether or not we should use a custom GeckoDriver (ALWAYS USE ON SCHOOL COMPUTERS)
}