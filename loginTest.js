const { Builder, By } = require("selenium-webdriver");

async function loginTest() {
    let driver = await new Builder()
        .forBrowser("chrome")
        .build();

    await driver.get("https://the-internet.herokuapp.com/login");

    let username = await driver.findElement(By.id("username"));
    await username.sendKeys("tomsmith");

    let password = await driver.findElement(By.id("password"));
    await password.sendKeys("SuperSecretPassword!");

    let loginButton = await driver.findElement(By.css("button[type='submit']"));
    await loginButton.click();

    console.log("Login test completed");

    await driver.quit();
}

loginTest();