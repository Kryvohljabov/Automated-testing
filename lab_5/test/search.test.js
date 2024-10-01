import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

describe("Page interaction", function () {
  let driver;

  before(async function () {
    const options = new chrome.Options().addArguments("--headless");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    await driver.close();
  });

  it("test shopping cart", async function () {
    this.timeout(60000);
    await driver.get("http://demo-store.seleniumacademy.com");
    const productName = "Top";
    await driver.findElement(By.id("search")).sendKeys(productName);
    await driver.findElement(By.xpath('//button[@title="Search"]')).click();

    await driver.wait(until.elementLocated(By.css(".product-info")), 1000);
    await driver.findElement(By.css(".product-info")).click();

    await driver.wait(until.elementLocated(By.id("option15")), 10000);
    await driver.findElement(By.id("option15")).click();

    await driver.wait(until.elementLocated(By.id("option78")), 10000);
    await driver.findElement(By.id("option78")).click();

    const addToCartDiv = await driver.findElement(
      By.className("add-to-cart-buttons"),
    );

    const buttons = await addToCartDiv.findElements(By.css("button"));

    await buttons[0].click();

    await driver.wait(until.elementLocated(By.css(".success-msg")), 5000);
    const cartMessage = await driver
      .findElement(By.css(".success-msg span"))
      .getText();

    expect(cartMessage).to.equal(
      "Sullivan Sport Coat was added to your shopping cart.",
    );

    let priceElements = await driver.findElements(
      By.css("td.product-cart-price .price"),
    );
    let priceText = await priceElements[0].getText();
    let unitPrice = parseFloat(priceText.replace("$", ""));

    let qtyInput = await driver.findElement(By.css('input[title="Qty"]'));
    await qtyInput.clear();
    let newQty = "2";
    await qtyInput.sendKeys(newQty);

    let updateButton = await driver.findElement(
      By.css(`button[title="Update"]`),
    );
    await updateButton.click();

    await driver.sleep(2000);

    let newPriceElement = await driver.findElement(
      By.css(".product-cart-total .price"),
    );
    let newSubtotalText = await newPriceElement.getText();

    let newSubtotal = parseFloat(
      newSubtotalText.replace(/[$,]/g, "").replace("$", ""),
    );

    let expectedSubtotal = unitPrice * parseInt(newQty);

    expect(newSubtotal).to.equal(expectedSubtotal);
  });
});
