// This program prompts the user for their name, capitalizes the first letter, and displays a greeting.

var name = prompt("Please enter your name:");

var firstChar = name.slice(0, 1);

var upperFirstChar = firstChar.toUpperCase();

var restOfName = name.slice(1, name.length);

var capitalizedName = upperFirstChar + restOfName;

alert("Hello, " + capitalizedName + "!");