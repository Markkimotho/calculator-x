const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => b === 0 ? null : a / b,
};
export function calculate(a, operator, b) {
  if (!Object.hasOwn(operations, operator)) throw new Error("Unknown operator");
  const result = operations[operator](Number(a), Number(b));
  return result === null || !Number.isFinite(result) ? null : Number(result.toPrecision(12));
}
export function appendDigit(current, digit) {
  if (!/^\d$/.test(digit) || current.replace(/[^\d]/g, "").length >= 12) return current;
  return current === "0" ? digit : current === "-0" ? `-${digit}` : current + digit;
}
export function formatNumber(value) {
  return value === null ? "Cannot divide by zero" : new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(value);
}
