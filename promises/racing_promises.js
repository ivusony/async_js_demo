const getDogsList = require('../callbacks');

const getPost = function(delay, url) {
    if(!delay){
        delay = 0
    }
    return new Promise((resolve, reject)=>{
        const fetch = require('fetch').fetchUrl;
        if(url === undefined){
            reject(new Error('No URL passed in getPost'))
        }
        setTimeout(function() {
            fetch(url, (e, meta, buff)=>{
                if(e){
                   return reject(new Error(`Error!`))
                }
                resolve(JSON.parse(buff.toString()))
            })
        }, delay)
    }).then(
        (post)=>{
            return {
                type : 'post',
                data : post
            }
        }
    ).catch(
        (e)=>{
           return e
        }
    )
}

const getDogImage = function(delay, url) {
    if(!delay){
        delay = 0
    }
    return new Promise((resolve, reject)=>{
        const fetch = require('fetch').fetchUrl;
        if(url === undefined){
            reject(new Error('No URL passed in getDogImage'))
        }
        setTimeout(function() {
            fetch(url, (e, meta, buff)=>{
                if(e){
                   return reject(new Error(`Error!`))
                }
                resolve(JSON.parse(buff.toString()).message[0])
            })
        }, delay)
    }).then(
        (dog)=>{
            return {
                type : 'dog',
                data : dog
            }
        }
    ).catch(
        (e)=>{
            return e
        }
    )
}


const race = function(postUrl, dogUrl) {
     return Promise.race([getPost(3000, postUrl), getDogImage(3000, dogUrl)])
     .then(
        (data)=>{
            return data
        }
     )
     .catch(
         (e)=>{
             return e
         }
     )
}

race('https://jsonplaceholder.typicode.com/posts/1', 'https://dog.ceo/api/breed/hound/images')

module.exports=race;