const fetch = require('fetch').fetchUrl;


function fetchDogs(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            fetch('https://dog.ceo/api/breeds/list/all', (e, meta , list)=>{
                if(e){
                    return reject(e)
                }
                resolve(JSON.parse(list.toString()))
            }) 
        }, 2000)
    })  
}

function writeDogIMGLinksToFile(dataToBeWritten, removeDataAfter2Sec){
    const fs = require('fs');
    return new Promise((resolve, reject)=>{
        if(typeof removeDataAfter2Sec !== 'boolean'){
            return reject(new Error("Type of removeDataAfter2Sec must be boolean"))
        }
        fs.writeFile('./dogIMGlist.txt', dataToBeWritten, (e)=>{
            if(e){
                return reject(e)
            }
            if(removeDataAfter2Sec){
                resolve(removeDataAfter2Sec)
            }else{
                resolve('Data saved')
            }
        })
    })
}



let promise1 = fetchDogs().then(
    (list)=>{
        console.log('Fetching dogs resolved');
        let dogBreedList = Object.keys(list.message);
        let firstDog = dogBreedList[0];
        return firstDog;
    },
    (e)=>{
        console.log(e)
    }
)
let promise2 = promise1.then(
    (dog)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                fetch(`https://dog.ceo/api/breed/${dog}/images`, function(e, meta, buffer){
                    if(e){
                        return reject(e)
                    }
                    console.log('promise 1 resolved. Delayed because wrapped in setTimeout');
                    return resolve(JSON.parse(buffer.toString()))
                })
            }, 2000)
        })
    },
    (e)=>{
        console.log(e);
    }
)
let promise3 = promise2.then(
    (dogImgLinksListResponse)=>{
        console.log('Promise 2 resolved');
        let dogImgLinksList = dogImgLinksListResponse.message;
        
        // writeDogIMGLinksToFile returns new Promise which returns another new Promise
        let fileWriteWrapperPromise = writeDogIMGLinksToFile(dogImgLinksList, true);

        let deletion = fileWriteWrapperPromise.then(
            (value)=>{
                if(value){
                    const fs = require('fs');
                    return new Promise((resolve, reject)=>{
                        setTimeout(()=>{
                            fs.unlink('./dogIMGlist.txt', (e)=>{
                                if(e){
                                    return reject(e)
                                }
                                resolve('File removed')
                            })
                        }, 2000)
                    })
                }
            }
        )

        deletion.then(
            (del)=>{
                console.log(del);
            }
        )
        
    },
    (e)=>{
        console.log(e);
    }
)

promise3.then(
    (value)=>{
        console.log('Promise 3 resolved');
    }
)

