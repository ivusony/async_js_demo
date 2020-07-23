let promiseOne = new Promise((resolve, reject)=>{
    resolve(2);
})


promiseOne.then(
    (value)=>{
        // value is 2 here
        console.log(value);
        return promiseTwo;
    }
).then(
    (value2)=>{
        // value2 is 5 here because promiseTwo
        console.log(value2);
        return promiseThree(value2);
    }
).then(
    (value3)=>{
        console.log(value3);
    }
)

let promiseTwo = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(5)
    }, 3000)
})

promiseTwo.then(
    (value)=>{
        return value
    }
)


function promiseThree(value){
    return new Promise((resolve, reject)=>{
        resolve(value * 2)
    })
}
