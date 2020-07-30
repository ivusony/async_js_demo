const https     = require('https');
const fs        = require('fs');
const crypto    = require('crypto');


const start = Date.now();

function doRequest(){
    https.request('https://www.google.com', (res)=>{
        let response;
        res.on('data', (chunk)=>{
            response+=chunk
        })
        res.on('end', ()=>{
            console.log(`doRequest() finished in ${Date.now() - start} miliseconds`);
        })
    }).end()
}

function doHash(){
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        console.log(`doHash() completed in: ${Date.now() - start} miliseconds`); 
    });
}

function readFile(){
    fs.readFile('./thread_test.js', 'utf8', ()=>{
        console.log(`readFile() completed in: ${Date.now() - start} miliseconds`); 
    })
}

// doRequest();

// readFile();

// doHash();
// doHash();
// doHash();
// doHash();

console.log(this)
