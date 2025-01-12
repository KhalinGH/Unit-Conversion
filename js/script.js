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

    const result = (value * conversionFactors[category][unit1][unit2]).toFixed(3);

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

    copyText.select();
    copyText
}