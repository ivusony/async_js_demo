const getData = require('./http_calls').getData;
const getDataWithDelay = require('./http_calls').getDataWithDelay;




Promise.all
(
    [
        getData('comments'), 
        getDataWithDelay('postss', 4000),
        getDataWithDelay('photos', 5000)
    ]
)
.then(
    (dataArray)=>{
        let newArr = dataArray.map((arr, i) => {
            console.log(arr)
        } )

    }
)
.catch(
    (e)=>{
        console.log(e);
    }
)
