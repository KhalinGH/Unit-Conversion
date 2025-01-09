document.getElementById('swap-button').addEventListener('click', () => {
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');

    // Swap the selected units
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
});

const conversionFactors = {
    length: {
        millimeters: {
            millimeters: 1,
            centimeters: 0.1,
            meters: 0.001,
            kilometers: 0.000001,
            miles: 0.0000006214,
            inches: 0.039370078740157,
            feet: 0.0032808399,

        },
        centimeters: {
            millimeters: 10,
            centimeters: 1,
            meters: 0.01,
            kilometers: 0.00001,
            miles: 0.0000062137,
            inches: 0.39370078740157,
            feet: 0.032808398950131,


        },
        meters: {
            millimeters: 1000,
            centimeters: 100,
            meters: 1,
            kilometers: 0.001,
            miles: 0.0006213712,
            inches: 39.3700787402,
            feet: 3.280839895,
            
        },
        kilometers: {
            millimeters: 1000000,
            centimeters: 100000,
            meters: 1000,
            kilometers: 1,
            miles: 0.6213711922,
            inches: 39370.1,
            feet: 3280.84,
        },
        miles: {
            millimeters: 1609344,
            centimeters: 160934.4,
            meters: 1609.344,
            kilometers: 1.60934,
            miles: 1,
            inches: 63360,
            feet: 5280,
        },
        inches: {
            millimeters: 25.4,
            centimeters: 2.54,
            meters: 0.0254,
            kilometers: 0.0000254,
            miles: 0.0000157828,
            inches: 1,
            feet: 0.0833333333,
        },
        feet: {
            millimeters: 304.8,
            centimeters: 30.48,
            meters: 0.3048,
            kilometers: 0.0003048,
            miles: 0.0001893939,
            inches: 12,
            feet: 1,
        }
    },

    weight: {
        grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
        kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274 },
        pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16 },
        ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1 }
    },


};

function convertUnits(){

    const category = getConversionCategory();
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const unit1 = fromUnit.value;
    const unit2 = toUnit.value;
    const value = parseFloat(document.getElementById("from-value").value);
    console.log("unit1 " + unit1 + " unit2 " + unit2 + " value " + value);


    if(isNaN(value)){
        alert("Please enter a value number!");
        return;
    }
   
    if (!conversionFactors[category][unit1] || !conversionFactors[category][unit1][unit2]) {
        alert("Conversion not supported!");
        return;
    }

    const result = value * conversionFactors[category][unit1][unit2];

    document.getElementById("to-value").value = result;

}

function getConversionCategory(){
    const path = window.location.pathname;
    if (path.includes("index")) return "length";
    if (path.includes("weight")) return "weight";
}