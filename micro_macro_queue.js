const { Console } = require('console');

const start = Date.now();

const sync_throw_error = function(){
    console.log('Sync error 1');
    throw new ErrorEvent()
}

function main(){
    console.log('+++++++++++++++++MAIN FUNCTION ENTERED++++++++++++++++');
    get_url_with_https();
    macro_delay();
    get_file_with_fs();
    console.log(`First log / sync / finished in ${Date.now() - start} ms`);
    promissed_request().then((log)=>{console.log(log)});
    console.log('++++++++++++++++MAIN FUNCTION FINISHED++++++++++++++++')
}


function macro_delay(){
    return setTimeout(
        ()=>{
            console.log(`Timer 0 ms / macroqueue / finished in ${Date.now() - start} ms`);
        }, 0
    )
}

function get_file_with_fs(){
    const fs = require('fs');
    fs.readFile('./test.js', 'utf8', (err, buff)=>{
        if(err){
            throw new ErrorEvent('File read failed')
        }
        console.log(`File read finished / macroqueue / finished in ${Date.now() - start} ms`);
    })
}

function get_url_with_https(){
    const https = require('https');

    https.request('https://www.google.com', (res)=>{
        let response;
        res.on('data', (chunk)=>{
            response+=chunk
        })
        res.on('end', ()=>{
            console.log(`Request finished / macroqueue / finished in ${Date.now() - start} ms`);
        })
    }).end()
}


function promissed_request(){
    return new Promise((resolve, reject)=>{
        resolve(`Promised resolved / microqueue / finished in ${Date.now() - start} ms`)
    })
}

main()