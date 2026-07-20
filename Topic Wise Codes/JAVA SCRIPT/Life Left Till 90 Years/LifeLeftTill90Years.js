// This function calculates the remaining life in days, weeks, and months based on the user's age till he's / she's 90 years old.

var age = Number(prompt("What is your age?"));

function lifeLeftTill90Years(age) {
    var yearsLeft = 90 - age;
    var daysLeft = yearsLeft * 365;
    var weeksLeft = yearsLeft * 52;
    var monthsLeft = yearsLeft * 12;

    return "You have " + daysLeft + " days, " + weeksLeft + " weeks, and " + monthsLeft + " months left.";
}

alert(lifeLeftTill90Years(age));