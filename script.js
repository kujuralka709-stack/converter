const category = document.getElementById("category");
const valueInput = document.getElementById("value");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const swapButton = document.getElementById("swapButton");

const units = {
    length: {
        meters: 1,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001,
        feet: 0.3048,
        inches: 0.0254,
        miles: 1609.344
    },

    weight: {
        kilograms: 1,
        grams: 0.001,
        milligrams: 0.000001,
        pounds: 0.45359237,
        ounces: 0.028349523125
    }
};

function loadUnits() {
    const selectedCategory = category.value;
    const unitNames = Object.keys(units[selectedCategory]);

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    unitNames.forEach(function(unit) {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    });

    if (selectedCategory === "length") {
        fromUnit.value = "meters";
        toUnit.value = "feet";
    } else {
        fromUnit.value = "kilograms";
        toUnit.value = "pounds";
    }

    convertUnits();
}

function convertUnits() {
    const inputText = valueInput.value;

    if (inputText.trim() === "") {
        result.textContent = "Enter a number";
        return;
    }

    const value = Number(inputText);

    const factors = units[category.value];

    const baseValue = value * factors[fromUnit.value];

    const convertedValue = baseValue / factors[toUnit.value];

    result.textContent =
        Number(convertedValue.toFixed(6)) + " " + toUnit.value;
}

category.addEventListener("change", loadUnits);

valueInput.addEventListener("input", convertUnits);

fromUnit.addEventListener("change", convertUnits);

toUnit.addEventListener("change", convertUnits);

swapButton.addEventListener("click", function() {
    const previousFrom = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = previousFrom;

    convertUnits();
});

loadUnits();