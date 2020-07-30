process.env.UV_THREADPOOL_SIZE=6;

let start = Date.now();
let cryptoRunCounter=1;

// thread blocking promise!
function takesLong(){
    return new Promise((resolve, reject)=>{
        for(let i=0; i<=999999999; i++){

        }
        resolve('TakesLOng finished')
    })
}

// real async promise. 
function threadInvolved(){
    const fs = require('fs');
    return new Promise((resolve, reject)=>{
        fs.readFile('./multitask.js', 'utf8', (err, data)=>{
            if(err){
                return reject(err)
            }
            // resolve with delay
            let finishedIN = Date.now() - start;
            resolve(`Async: FS resolved in ${finishedIN} mils`)
        })
    })
}

// real async promise. 
function threadInvolved2(cc){
    const crypto = require('crypto');
    cryptoRunCounter++;
    return new Promise((resolve, reject)=>{
        crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
            let finishedIN = Date.now() - start;
            resolve(`Async: CRYPTO ${cc} resolved in ${finishedIN} mils`)
        })
    })
}

// this promise blocks execution while it is sync

// takesLong().then(log=>{
//     console.log(log);
// })

Promise.resolve('Resolved right away!').then(res=>{console.log(`Async: Resolved first after ${Date.now() - start} ms`)})

threadInvolved().then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')})


threadInvolved2(cryptoRunCounter).then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')});
threadInvolved2(cryptoRunCounter).then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')});
threadInvolved2(cryptoRunCounter).then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')});
threadInvolved2(cryptoRunCounter).then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')});
threadInvolved2(cryptoRunCounter).then(data=>{console.log(data)}).catch(err=>{console.log('thredInvolved error')});


console.log('Sync: This logs first')

//event loop waits for a final callback
setTimeout(()=>{
    console.log(`Exiting proces callback set for 4000 ms, happened in ${Date.now() - start} ms`);
    process.exit()
}, 4000)
console.log('Sync: setTimeout callback fn run sync! Ticking...');



