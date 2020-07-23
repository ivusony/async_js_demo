module.exports = {
    test_callback_function_async : 
        function (number, cb) {
            setTimeout(function(){
                if(typeof number !== 'number'){
                    cb(new Error('Number should be type number'));
                    return
                }
                let result = number * number;
                cb(null, result)
            }, 4000)
        },
    
    test_callback_function :
        function (number, cb) {
            if(typeof number !== 'number'){
                cb(new Error('First argument must be type number'))
                return
            }
            let result = number * number
            cb(null, result)
        }
} 
