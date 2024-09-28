import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

describe("Math Page Automation", function () {
  let driver;

  before(async function () {
    const options = new chrome.Options().addArguments("--headless");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    this.timeout(30000);
  });

  after(async function () {
    await driver.close();
  });

  it("should solve the math problem and submit the form", async function () {
    await driver.get("http://suninjuly.github.io/math.html");
    const xElement = await driver.findElement(By.id("input_value"));
    const x = await xElement.getText();
    const answer = Math.log(Math.abs(12 * Math.sin(parseFloat(x))));
    await driver.findElement(By.id("answer")).sendKeys(answer.toString());
    await driver.findElement(By.id("robotCheckbox")).click();
    await driver.findElement(By.id("robotsRule")).click();
    await driver.findElement(By.css("button.btn")).click();
    const alert = await driver.wait(until.alertIsPresent(), 10000);
    const alertText = await alert.getText();
    await alert.accept();
    expect(alertText).to.include("Congrats, you've passed the task!");
  });
});
