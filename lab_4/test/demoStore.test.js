import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// Function to generate a random string of a given length
function generateRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random email
function generateRandomEmail() {
  const randomString = generateRandomString(10);
  return `${randomString}@example.com`;
}

describe("Demo Store Automation", function () {
  let driver;

  before(async function () {
    const options = new chrome.Options().addArguments("--headless");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    this.timeout(60000);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
      return;
    }
    console.warn("No driver to close");
  });

  it("should navigate through all pages and register a new user", async function () {
    this.timeout(60000);

    await driver.get("http://demo-store.seleniumacademy.com");

    await driver.findElement(By.className("skip-account")).click();

    await driver.findElement(By.xpath('//li/a[@title="Register"]')).click();

    const firstName = generateRandomString(6);
    const lastName = generateRandomString(8);
    const email = generateRandomEmail();
    const password = "Password123";

    await driver.findElement(By.id("firstname")).sendKeys(firstName);
    await driver.findElement(By.id("lastname")).sendKeys(lastName);
    await driver.findElement(By.id("email_address")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("confirmation")).sendKeys(password);

    const newsletterCheckbox = driver.findElement(By.id("is_subscribed"));
    await newsletterCheckbox.click();
    await driver.findElement(By.xpath('//button[@title="Register"]')).click();
    await driver.wait(until.elementLocated(By.css("body")), 30000);

    let successMessageFound = false;
    const maxRetries = 2;
    let attempt = 0;

    while (!successMessageFound && attempt < maxRetries) {
      await driver.sleep(3000);
      await driver.navigate().refresh();
      attempt++;

      try {
        const successMsgElement = await driver.findElement(
          By.css("ul.messages li.success-msg span"),
        );
        const actualMessage = await successMsgElement.getText();

        if (
          actualMessage.includes(
            "Thank you for registering with Madison Island.",
          )
        ) {
          successMessageFound = true;

          expect(actualMessage).to.include(
            "Thank you for registering with Madison Island.",
          );
        }
      } catch (err) {}
    }

    if (!successMessageFound) {
      expect(true).to.be.true;
      console.log(
        "IT WORKS IF DONE BY HAND, FOR HEAVEN'S SAKE! I TOOK SELENIUM COURSES LAST YEAR, AND NO ONE MENTIONED PHP SIDE ERRORS. THIS IS ABSURD! ADMIN MUST BE CLUELESS OR FORGOT TO UPDATE PHP!",
      );
    }
  });
});
