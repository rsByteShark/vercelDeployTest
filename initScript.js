const path = require('path');
const fs = require('fs');
(async () => {

    console.log('Init script started');

    const directoryPath = path.join(__dirname);
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
    });


    spawn("next", ["build"], {
        stdio: "inherit",
        cwd: process.cwd(),
        env: process.env,
        shell: true
    });

})()