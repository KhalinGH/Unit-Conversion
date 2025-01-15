document.getElementById('swap-button').addEventListener('click', () => {
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');

    // Swap the selected units
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.blur(); // Remove focus after interaction
    });

    button.addEventListener('touchstart', (event) => {
        event.target.blur(); // Remove focus for touch interactions
    });
});

const conversionFactors = {
    length: {
        millimeters: { millimeters: 1, centimeters: 0.1, meters: 0.001, kilometers: 0.000001, miles: 0.0000006214, inches: 0.039370078740157, feet: 0.0032808399, yard: 0.0010936133 },
        centimeters: { millimeters: 10, centimeters: 1, meters: 0.01, kilometers: 0.00001, miles: 0.0000062137, inches: 0.39370078740157, feet: 0.032808398950131, yard: 0.010936133 },
        meters: { millimeters: 1000, centimeters: 100, meters: 1, kilometers: 0.001, miles: 0.0006213712, inches: 39.3700787402, feet: 3.280839895, yard: 1.0936132983 },
        kilometers: { millimeters: 1000000, centimeters: 100000, meters: 1000, kilometers: 1, miles: 0.6213711922, inches: 39370.1, feet: 3280.84, yard: 1093.6132983 },
        miles: { millimeters: 1609344, centimeters: 160934.4, meters: 1609.344, kilometers: 1.60934, miles: 1, inches: 63360, feet: 5280, yard: 1760 },
        inches: { millimeters: 25.4, centimeters: 2.54, meters: 0.0254, kilometers: 0.0000254, miles: 0.0000157828, inches: 1, feet: 0.0833333333, yard: 0.0277777778 },
        feet: { millimeters: 304.8, centimeters: 30.48, meters: 0.3048, kilometers: 0.0003048, miles: 0.0001893939, inches: 12, feet: 1, yard: 0.3333333333 },
        yard: { millimeters: 914.4, centimeters: 91.44, meters: 0.9144, kilometers: 0.0009144, miles: 0.0005681818, inches: 36, feet: 3, yard: 1 }
    },
    

    weight: {
        microgram: { microgram: 1, milligram: 0.001, grams: 1e-3, kilograms: 1e-6, pounds: 2.20462e-6, ounces: 3.5274e-5, stone: 1.57473e-6, metricTon: 1e-9 },
        milligram: { microgram: 1000, milligram: 1, grams: 1e-3, kilograms: 1e-6, pounds: 2.20462e-6, ounces: 3.5274e-5, stone: 1.57473e-6, metricTon: 1e-9 },
        grams: { microgram: 1e3, milligram: 1000, grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274, stone: 1.57473e-5, metricTon: 1e-6 },
        kilograms: { microgram: 1e6, milligram: 1e3, grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274, stone: 0.000157473, metricTon: 1e-3 },
        pounds: { microgram: 4.53592e5, milligram: 453592, grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16, stone: 0.0714286, metricTon: 4.53592e-5 },
        ounces: { microgram: 2.83495e4, milligram: 28349.5, grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1, stone: 0.00446429, metricTon: 2.83495e-5 },
        stone: { microgram: 6.35029e5, milligram: 635029, grams: 635.029, kilograms: 0.635029, pounds: 14, ounces: 224, stone: 1, metricTon: 6.35029e-4 },
        metricTon: { microgram: 1e9, milligram: 1e6, grams: 1e3, kilograms: 1e3, pounds: 2204.62, ounces: 35274, stone: 1574.73, metricTon: 1 }

    },

    time:{
        milliseconds: {milliseconds: 1, seconds:0.001, minutes: 1.6667e-5, hours: 2.7778e-7, days: 1.157416667e-8, weeks: 1.653452381428571e-9, month: 3.805201310464316636e-10, years: 3.171004567123287176e-11},
        seconds: {milliseconds: 1000, seconds: 1, minutes: 0.0166667, hours: 0.000277778, days: 1.1574e-5, weeks: 1.6534e-6, month: 3.8052e-7, years: 3.171e-8},
        minutes: {milliseconds: 60000, seconds: 60, minutes: 1, hours: 0.0166667, days: 0.00069444583333, weeks: 9.9206e-5, month: 2.2831e-5, years: 1.9026e-6},
        hours: {milliseconds: 3600000, seconds: 3600, minutes: 60, hours: 1, days: 0.0416667, weeks: 0.00595238, month: 0.00136986, years: 0.000114155},
        days: {milliseconds: 8.64e+7, seconds: 86400, minutes: 1440, hours: 24, days: 1, weeks: 0.142857, month: 0.0328767, years: 0.00273973},
        weeks: {milliseconds: 6.048e+8, seconds:604800, minutes: 10080, hours: 168, days: 7, weeks: 1, month: 0.230137, years: 0.0191781},
        month: {milliseconds: 2.629746e+9, seconds: 2.629746e+6, minutes: 43829.1, hours: 730.484, days: 30.4368, weeks: 4.34812, month: 1, years: 0.0833333},
        years: {milliseconds: 3.1556926e+10, seconds: 3.1556926e+7, minutes: 525949.2, hours: 8765.82, days: 365.242, weeks: 52.1775, month: 12, years: 1}
    },
    temperature: {
        celsius: { fahrenheit: (celsius) => (celsius * 9 / 5) + 32, kelvin: (celsius) => celsius + 273.15, rankine: (celsius) => (celsius + 273.15) * 9 / 5 },
        fahrenheit: { celsius: (fahrenheit) => (fahrenheit - 32) * 5 / 9, kelvin: (fahrenheit) => (fahrenheit - 32) * 5 / 9 + 273.15, rankine: (fahrenheit) => fahrenheit + 459.67 },
        kelvin: { celsius: (kelvin) => kelvin - 273.15, fahrenheit: (kelvin) => (kelvin - 273.15) * 9 / 5 + 32, rankine: (kelvin) => kelvin * 1.8 },
        rankine: { celsius: (rankine) => (rankine - 491.67) * 5 / 9, fahrenheit: (rankine) => rankine - 459.67, kelvin: (rankine) => rankine / 1.8 }
    }
    
};

function convertTemperature(fromUnit, toUnit, value) {
    if (fromUnit == toUnit){
        return value;
    }
    const formula = conversionFactors["temperature"][fromUnit][toUnit];
    return formula(value);
}

function convertUnits(){
    const category = getConversionCategory();
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
    const value = parseFloat(document.getElementById("from-value").value);

    if(isNaN(value)){
        alert("Please enter a value number!");
        return;
    }

    let result;
    if (category == "temperature"){
        try{
            result = convertTemperature(fromUnit, toUnit, value);
        } catch (error) {
            alert(error.message);
            return;
        }
    } else{
        if (!conversionFactors[category][fromUnit] || !conversionFactors[category][fromUnit][toUnit]) {
            alert("Conversion not supported!");
            return;
        }
        result = ((value * 1000000) * conversionFactors[category][fromUnit][toUnit]) / 1000000;
        // result = value * conversionFactors[category][fromUnit][toUnit];
  
    }
   
    document.getElementById("to-value").value = result;
}

function getConversionCategory(){
    const path = window.location.pathname;
    //need to change this cause path isn't viable
    if (path.includes("index")) return "length";
    if (path.includes("weight")) return "weight";
    if (path.includes("time")) return "time";
    if (path.includes("temperature")) return "temperature";


}

function copy(){
    let copyText = document.getElementById("to-value").value;

    if (copyText){
        navigator.clipboard.writeText(copyText);
        const copyButton = document.getElementById('copy-button');
        copyButton.innerHTML = '<i class="bi bi-clipboard-check"></i>';
        copyButton.title = "Copied!";

        setTimeout(() =>{
            copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
            copyButton.title = "Copy to Clipboard";
        }, 2000);
    }
    else{
        alert("No value to copy.");
    }
}