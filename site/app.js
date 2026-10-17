import { appendDigit, calculate, formatNumber } from "./logic.js";
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const historyList = document.querySelector("#history-list");
const history = [];
const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
let current = "0", left = null, operator = null, fresh = false;

function render() {
  display.textContent = current === "Error" ? "Cannot divide by zero" : current.endsWith(".") ? `${formatNumber(Number(current))}.` : formatNumber(Number(current));
  expression.textContent = operator ? `${formatNumber(Number(left))} ${symbols[operator]}` : "Ready";
}
function renderHistory() {
  historyList.replaceChildren();
  if (!history.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Your last five calculations will appear here.";
    historyList.append(li);
  }
  for (const item of history) {
    const li = document.createElement("li"), label = document.createElement("span"), result = document.createElement("strong");
    label.textContent = `${item.left} ${symbols[item.operator]} ${item.right}`;
    result.textContent = item.result;
    li.append(label, result);
    historyList.append(li);
  }
}
function equals() {
  if (!operator || left === null) return;
  const right = current, result = calculate(left, operator, right);
  if (result !== null) {
    history.unshift({ left: formatNumber(Number(left)), operator, right: formatNumber(Number(right)), result: formatNumber(result) });
    history.splice(5);
  }
  current = result === null ? "Error" : String(result);
  left = null; operator = null; fresh = true;
  renderHistory();
}
function handle({ digit, op, action }) {
  if (digit !== undefined) {
    if (fresh || current === "Error") { current = "0"; fresh = false; }
    current = appendDigit(current, digit);
  } else if (op) {
    if (operator && !fresh) equals();
    left = current === "Error" ? "0" : current;
    operator = op; fresh = true;
  } else switch (action) {
    case "clear": current = "0"; left = null; operator = null; fresh = false; break;
    case "sign": if (current !== "Error" && current !== "0") current = current.startsWith("-") ? current.slice(1) : `-${current}`; break;
    case "percent": if (current !== "Error") current = String(Number(current) / 100); break;
    case "backspace": current = fresh || current === "Error" ? "0" : current.slice(0, -1) || "0"; fresh = false; break;
    case "decimal": if (fresh || current === "Error") { current = "0"; fresh = false; } if (!current.includes(".")) current += "."; break;
    case "equals": equals(); break;
  }
  render();
}
document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handle({ digit: button.dataset.digit, op: button.dataset.operator, action: button.dataset.action });
});
document.querySelector("#clear-history").addEventListener("click", () => { history.length = 0; renderHistory(); });
document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) handle({ digit: event.key });
  else if (["+", "-", "*", "/"].includes(event.key)) { event.preventDefault(); handle({ op: event.key }); }
  else if (event.key === "Enter" || event.key === "=") { event.preventDefault(); handle({ action: "equals" }); }
  else if (event.key === "Escape") handle({ action: "clear" });
  else if (event.key === "Backspace") handle({ action: "backspace" });
  else if (event.key === ".") handle({ action: "decimal" });
});
render();
