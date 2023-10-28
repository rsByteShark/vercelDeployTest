const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { get } = require('https');
const os = require("os");


(async () => {

    console.log(`Init script started on ${os.platform} sysytem\n\n`);


    console.log("creating new files in public dir...\n\n");
    const data = fs.readFileSync("./public/3.webp");
    fs.writeFileSync("./public/4.webp", data);


    process.env.CRON_SECRET = "CRON_SECRET";

    process.env.SOME_VAR = 2000;

    fs.writeFileSync("./.env.local", `CRON_SECRET=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBd\n 
    SOME_VAR=2012`)


    console.log(`env ${process.env.CRON_SECRET} - ${process.env.SOME_VAR}..\n\n`);


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


    // console.log('Pinging fakestoreapi...\n\n');


    // await new Promise((resolve) => {

    //     get("https://fakestoreapi.com/products/1", (res) => {

    //         console.log(`fakeapistore responded with code: ${res.statusCode}\n\n`);

    //         res.on("data", (fkstrdata) => {

    //             console.log(`Data from fakestore: ${fkstrdata.toString()}\n\n`);

    //             resolve();

    //         })

    //     })


    // })


    console.log('Generating tables in postgerse db...\n\n');


    const prismaDBPushProcess = spawn("npx", ["prisma", "db", "push"], {
        stdio: "inherit",
        cwd: process.cwd(),
        env: process.env,
        shell: true
    });

    prismaDBPushProcess.on("exit", () => {

        console.log('Generating prisma client code in local env...\n\n');
        const prismaDBclientCreationProcess = spawn("npx", ["prisma", "generate"], {
            stdio: "inherit",
            cwd: process.cwd(),
            env: process.env,
            shell: true
        });


        prismaDBclientCreationProcess.on("exit", () => {


            console.log('Starting next build...\n\n');


            spawn("next", ["build"], {
                stdio: "inherit",
                cwd: process.cwd(),
                env: process.env,
                shell: true
            });

        })


    });





})()