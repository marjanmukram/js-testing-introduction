const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const output = generateText("max", 12);
  expect(output).toBe("max (12 years old)");
});

test("should accept less args", () => {
  const output = generateText("", 12);
  expect(output).toBe(" (12 years old)");
  const output2 = generateText("max", null);
  expect(output2).toBe("max (null years old)");
});

test("should check and generate", () => {
  const output = checkAndGenerate("", 12);
  expect(output).toBeFalsy();
  const output2 = checkAndGenerate("max", null);
  expect(output2).toBeFalsy();
  const output3 = checkAndGenerate("max", 12);
  expect(output3).toBe("max (12 years old)");
});

test("should click around", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///Users/marjan/Documents/unitTesitng/js-testing-introduction/index.html"
  );
  await page.click("input#name");
  await page.type("input#name", "Mary");
  await page.click("input#age");
  await page.type("input#age", "28");
  await page.click("#btnAddUser", "28");
  const finalText = await page.$eval(".user-list", el => el.textContent);
  expect(finalText).toBe("Mary (28 years old)");
}, 10000);
