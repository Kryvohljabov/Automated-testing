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

    this.timeout(60000);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
      return;
    }
    console.warn("No driver to close");
  });

  it("should search for a product and add it to the cart", async function () {
    this.timeout(60000);
    await driver.get("http://demo-store.seleniumacademy.com");
    const productName = "Top";
    await driver.findElement(By.id("search")).sendKeys(productName);
    await driver.findElement(By.xpath('//button[@title="Search"]')).click();

    await driver.wait(until.elementLocated(By.css(".product-info")), 1000);
    await driver.findElement(By.css(".product-info")).click();

    await driver.wait(until.elementLocated(By.id("swatch15")), 10000);
    await driver.findElement(By.id("swatch15")).click();
    await driver.findElement(By.id("swatch78")).click();

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
  });

  it("should update the quantity and verify the price change", async function () {
    this.timeout(60000);
    await driver.get("http://demo-store.seleniumacademy.com");

    await driver.wait(until.elementLocated(By.css("a.skip-cart")), 10000);
    const skipCartLink = await driver.findElement(By.css("a.skip-cart"));
    await skipCartLink.click();

    await driver.wait(until.elementLocated(By.css("a.cart-link")), 5000);
    const cartLink = await driver.findElement(By.css("a.cart-link"));
    await cartLink.click();

    await driver.wait(until.urlContains("checkout/cart"), 5000);

    const priceElements = await driver.findElements(
      By.css("td.product-cart-price .price"),
    );
    expect(priceElements.length).to.equal(1);

    const priceText = await priceElements[0].getText();
    const unitPrice = parseFloat(priceText.replace("$", ""));
    expect(unitPrice).to.be.a("number").and.not.NaN;

    // Change the quantity of the item and update
    const qtyInput = await driver.findElement(By.css('input[title="Qty"]'));
    await qtyInput.clear();
    const newQty = "2";
    await qtyInput.sendKeys(newQty);

    const updateButton = await driver.findElement(
      By.css('button[title="Update"]'),
    );
    await updateButton.click();

    await driver.sleep(2000);

    const newPriceElement = await driver.findElement(
      By.css(".product-cart-total .price"),
    );
    const newSubtotalText = await newPriceElement.getText();
    const newSubtotal = parseFloat(newSubtotalText.replace(/[$,]/g, ""));

    const expectedSubtotal = unitPrice * parseInt(newQty);
    expect(newSubtotal).to.equal(expectedSubtotal);
  });
});
