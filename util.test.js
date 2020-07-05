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

