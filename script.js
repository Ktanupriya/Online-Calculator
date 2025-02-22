let display = document.getElementById("display");
let historyDiv = document.getElementById("history");

// Append value to display
function appendToDisplay(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculateResult() {
    try {
        let expression = display.value
            .replace(/sin\(/g, 'math.sin(')
            .replace(/cos\(/g, 'math.cos(')
            .replace(/tan\(/g, 'math.tan(')
            .replace(/log\(/g, 'math.log10(')
            .replace(/sqrt\(/g, 'math.sqrt(')
            .replace(/pi/g, 'math.pi')
            .replace(/e/g, 'math.e')
            .replace(/\^/g, '**');

        let result = math.evaluate(expression);
        addToHistory(display.value + " = " + result);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Add to history
function addToHistory(entry) {
    let p = document.createElement("p");
    p.textContent = entry;
    historyDiv.prepend(p);
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/().]/.test(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
