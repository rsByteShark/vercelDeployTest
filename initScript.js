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

    console.log('Pinging fakestoreapi...\n\n');


    await new Promise((resolve) => {

        get("https://fakestoreapi.com/products/1", (res) => {

            console.log(`fakeapistore responded with code: ${res.statusCode}\n\n`);

            res.on("data", (fkstrdata) => {

                console.log(`Data from fakestore: ${fkstrdata.toString()}\n\n`);

                resolve();

            })

        })


    })


    console.log('Generating from prisma schema');


    const prismaDBPushProcess = spawn("npx", ["prisma", "generate"], {
        stdio: "inherit",
        cwd: process.cwd(),
        env: process.env,
        shell: true
    });


    prismaDBPushProcess.on("exit", () => {


        console.log('Starting next build...');


        spawn("next", ["build"], {
            stdio: "inherit",
            cwd: process.cwd(),
            env: process.env,
            shell: true
        });

    })



})()