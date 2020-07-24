module.exports = {
    test_callback_function_async : 
        function (number, cb) {
            if(typeof number !== 'number'){
                cb(new Error('Number should be type number'));
                return
            }
            let result = number * number;
            cb(null, result)
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
