const fs = require('fs');

fs.writeFile('example.txt', 'Hello from Node JS', (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

//type node nativemodules.js in the terminal to run the code.
//The output is "The file has been saved!"