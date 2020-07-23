function getDogsList(cb){
    const fetch = require('fetch').fetchUrl;

    fetch('https://dog.ceo/api/breeds/list/all', (e, m, data)=>{
        const dogsString = data.toString();
        const dogsArray = JSON.parse(dogsString).message;
        const randomDogFromArray = getRandomDogFromArray(dogsArray);
        writeToFileAndDeleteIt(dogsString, randomDogFromArray, cb);
    })
}



function writeToFileAndDeleteIt(dataToBeWritten, dogBreed, cb){
    const fs = require('fs');
    fs.writeFile('./dogsList', dataToBeWritten, (e, data)=>{
        if(e){
            cb(new Error('Data occured: ' + e));
            return
        }
        // fake delay 1
        setTimeout(()=>{
            console.log('First timeout!');
            // fake delay 2
            setTimeout(()=>{
                console.log('Second timeout...and:')
                deleteFile(getDogBreedImages, dogBreed, cb);
            }, 3000)
        }, 3000)
    })
}



function deleteFile(getDogBreedImages, dogBreed, cb){
    const fs = require('fs');
    fs.unlink('./dogsList', ()=>{
        console.log('File deleted, getting dog breed images:');
        cb(null, true);
        getDogBreedImages(dogBreed);
    })
}

function getRandomDogFromArray(arrayOfDogs){
    let keys = Object.keys(arrayOfDogs);
    let randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex]
}

function getDogBreedImages(dogBreed, saveToFileCb){
    const fetch = require('fetch').fetchUrl;
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images`, (e, meta, buff)=>{
        if(e){
            throw new Error(`${dogBreed} images fetch failed`)
        }
        const images = JSON.parse(buff.toString()).message;
        console.log(images)
    })
}


// getDogsList();


module.exports = getDogsList;