import assert from 'assert';
import { describe } from 'mocha';
import { By } from 'selenium-webdriver';
import { createSelenium } from './selenium.js';

describe("button clicking", async function () {
    const driver = await createSelenium();
    await driver.get('http://www.uitestingplayground.com/click');
    const btn = await driver.findElement(By.id('badButton'));
    await btn.click();

    await driver.sleep(5000);
    await driver.quit();
});


describe("hidden layers", async function () {
    const driver = await createSelenium();
    await driver.get('http://www.uitestingplayground.com/hiddenlayers');
    const btn = await driver.findElement(By.id("greenButton"));
    await btn.click();

    await driver.sleep(5000);
    await driver.quit();
});

describe("disabledinput", async function () {
    const driver = await createSelenium();
    await driver.get('http://www.uitestingplayground.com/disabledinput');
    const btn = await driver.findElement(By.id("enableButton"));
    await btn.click();

    var inputField = await driver.findElement(By.id("inputField"));
    while (!await inputField.isEnabled()) {
        await driver.sleep(1000);
    }

    await inputField.click();
    await inputField.sendKeys("Hello World!");
    assert.strictEqual(await inputField.getAttribute('value'), "Hello World!")
    await driver.sleep(5000);
    await driver.quit();
});


describe("alert", async function () {
    const driver = await createSelenium();
    await driver.get('http://www.uitestingplayground.com/alerts');

    var alertButton = await driver.findElement(By.id("alertButton"));
    await alertButton.click();
    await driver.switchTo().alert().accept();

    var confirmButton = await driver.findElement(By.id("confirmButton"));
    await confirmButton.click();
    await driver.sleep(5000);
    await driver.switchTo().alert().accept();

    var promptButton = await driver.findElement(By.id("promptButton"));
    await promptButton.click();
    await driver.sleep(5000);
    var alert = await driver.switchTo().alert();
    await alert.sendKeys("hello");
    await alert.accept();
    await driver.sleep(5000);
    await driver.quit();
});

describe("animation", async function () {
    const driver = await createSelenium();
    await driver.get("http://www.uitestingplayground.com/animation");

    var startAnimationButton = await driver.findElement(By.id("animationButton"));
    await startAnimationButton.click();

    var movingTargetButton = driver.findElement(By.id("movingTarget"));
    while (!(await movingTargetButton.getAttribute('class')).includes('spin')) {
        await driver.sleep(1000);
    }
    await movingTargetButton.click();

    var statusLabel = await driver.findElement(By.id("opstatus"));
    const statusText = await statusLabel.getText();
    assert.strictEqual(statusText.includes('Animating'), false, 'Fuck you moving targeet doesnt have spin class after click');

    await driver.sleep(5000);
    await driver.quit();
});

describe("textinput", async function () {
    const driver = await createSelenium();
    await driver.get("http://www.uitestingplayground.com/textinput");

    var inputField = await driver.findElement(By.id("newButtonName"));
    var button = await driver.findElement(By.id("updatingButton"));

    await inputField.click();
    await inputField.sendKeys("Hello World");
    await button.click();

    var buttonText = await button.getText();
    assert.strictEqual(buttonText, 'Hello World', 'Goodbye World');

    await driver.sleep(5000);
    await driver.quit();

});


