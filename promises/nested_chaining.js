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
        }, 3000)
    }).then(
        (p)=>{
            return p
        }
    )
} 