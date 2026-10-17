import test from "node:test";
import assert from "node:assert/strict";
import { appendDigit, calculate, formatNumber } from "../site/logic.js";
test("arithmetic and zero division", () => {
  assert.equal(calculate(0.1, "+", 0.2), 0.3);
  assert.equal(calculate(8, "/", 2), 4);
  assert.equal(calculate(8, "/", 0), null);
});
test("digit entry caps display length", () => {
  assert.equal(appendDigit("0", "9"), "9");
  assert.equal(appendDigit("123456789012", "3"), "123456789012");
});
test("number formatting", () => assert.equal(formatNumber(1234.5), "1,234.5"));
