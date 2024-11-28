import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { By } from 'selenium-webdriver';
import { createSelenium } from './selenium.js';

describe("selenium", function () {
    it("works with button clicking", async function () {
        const driver = await createSelenium();
        await driver.get('http://www.uitestingplayground.com/click');
        const btn = await driver.findElement(By.id('badButton'));
        await btn.click();

        await driver.sleep(5000);
        await driver.quit();

        assert.isNotNull(btn, "Bad button is null");

    });

    it("works with hidden layers", async function () {
        const driver = await createSelenium();
        await driver.get('http://www.uitestingplayground.com/hiddenlayers');
        const btn = await driver.findElement(By.id("greenButton"));
        await btn.click();

        await driver.sleep(5000);
        await driver.quit();
        assert.isNotNull(btn, "Green button is null");

    })

    it("works with disabled input", async function () {
        const driver = await createSelenium();
        await driver.get('http://www.uitestingplayground.com/disabledinput');
        const btn = await driver.findElement(By.id("enableButton"));
        await btn.click();

        var inputField = await driver.findElement(By.id("inputField"));
        while (!await inputField.isEnabled()) {
            continue
        }

        await inputField.click();
        await inputField.sendKeys("Hello World!");
        assert.equal(await inputField.getAttribute('value'), 'Hello World!', 'Input field has wrong text')
        await driver.sleep(5000);
        await driver.quit();

    })
    it("workks with alert", async function () {
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

    })
    it("works with animation", async function () {
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
        assert.equal(statusText.includes('Animating'), false, 'Fuck you moving targeet doesnt have spin class after click');

        await driver.sleep(5000);
        await driver.quit();

    })
    it("work with textinput", async function () {
        const driver = await createSelenium();
        await driver.get("http://www.uitestingplayground.com/textinput");

        var inputField = await driver.findElement(By.id("newButtonName"));
        var button = await driver.findElement(By.id("updatingButton"));

        await inputField.click();
        await inputField.sendKeys("Hello World");
        await button.click();

        var buttonText = await button.getText();
        assert.equal(buttonText, 'Hello World', 'Button text is not "Hello World"');

        await driver.sleep(5000);
        await driver.quit();

    })
});



