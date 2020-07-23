module.exports = {
    getData : function(dataType) {
        const fetch = require('fetch').fetchUrl;
        return new Promise((resolve, reject)=>{
            if(!dataType){
                reject(new Error('No data type defined'))
            }
            fetch(`https://jsonplaceholder.typicode.com/${dataType}`, (e, meta, buff)=>{
                if(e){
                    reject(new Error('Error in get method'))
                }
                resolve(JSON.parse(buff.toString()))
            })
        })
    },
    getDataWithDelay : function(dataType, delayInMiliseconds) {
        const fetch = require('fetch').fetchUrl;
        if(!delayInMiliseconds){
            delayInMiliseconds = 2000
        }
        return new Promise((resolve, reject)=>{
            if(!dataType){
                reject(new Error('No data type defined'))
            }
            setTimeout(()=>{
                fetch(`https://jsonplaceholder.typicode.com/${dataType}`, (e, meta, buff)=>{
                    if(e){
                        reject(new Error('Error in getDatasWithDelay'))
                    }
                    resolve(JSON.parse(buff.toString()))
                })
            }, delayInMiliseconds)
        })
    }
}