function bmiCalculator(weight, height) {
    var bmi = weight / (height * height);
    return Math.round(bmi);
}

function calculateBMI() {

    var weight = Number(document.getElementById("weight").value);
    var height = Number(document.getElementById("height").value);

    var bmi = bmiCalculator(weight, height);

    document.getElementById("result").innerHTML =
        "Your BMI is " + bmi;
}