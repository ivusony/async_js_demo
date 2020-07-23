const { fetchUrl } = require('fetch');

let getPost = new Promise((resolve, reject)=>{
    const fetch = require('fetch').fetchUrl;
    fetch('https://jsonplaceholder.typicode.com/posts/1', (e, meta, buff)=>{
        if(e){
            reject(e)
        }
        resolve(buff)
    })
}).then(
    (post)=>{
        return savePost(post.toString())
    }
)
.then(
    (post)=>{
        console.log("=================POST================");
        console.log(post);
        console.log("===============SAVED=================");
        return deleteFile('./post.txt');
    }
)
.then(
    (msg)=>{
        console.log(msg);
    }
)
.catch(
    (e)=>{
        console.log('Error catched:');
        console.log(e);
    }
)


let savePost = function(post) {
    return new Promise((resolve, reject)=>{
        const fs = require('fs');
        fs.writeFile('./post.txt', post, (e, data)=>{
            if(e){
                reject(e)
            }
            resolve(post)
        })
    }).then(
        (post)=>{
            console.log("TEST");
            return testDelayedPromise(post);
        }
    )
}

let testDelayedPromise = function(p) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(p)
            // reject(new Error('TEST ERROR'))
        }, 3000)
    }).then(
        (p)=>{
            return p
        }
    )
} 


let deleteFile = function(filePath) {
    return new Promise((resolve, reject)=>{
        const fs = require('fs');
        setTimeout(()=>{
            fs.unlink(filePath, (e)=>{
                if(e){
                    reject(e)
                }
                resolve('FILE DELETED')
            })
        }, 2000)
    })
}