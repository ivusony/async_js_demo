const test_cb_fn_async  = require('../test_callback_function').test_callback_function_async;
const test_cb_fn        = require('../test_callback_function').test_callback_function;
const getDogsList       = require('../callbacks');
const expect    =   require('chai').expect;

describe('Test async function', function(){
    this.timeout(5000); 
    it('Should return 100 if passed 10', function(done){
        test_cb_fn_async(10, (err, result)=>{
            expect(result).to.equal(100);
            done();
        })
    })

    it('shoud return error if string passed', function(done){
        test_cb_fn_async("10", (err, result)=>{
            expect(err).to.not.equal(null);
            expect(err.message).to.equal('Number should be type number');
            done();
        })
    })
})


describe('Test sync function', ()=>{
    it('should return 100 if passed 10', ()=>{
        test_cb_fn(10, (err, result)=>{
            expect(result).to.equal(100)
        })
    })
    
})


describe('Test getDogsList async function', function(){
    this.timeout(7000)
    it('should return 1 if file is created', (done)=>{
        getDogsList((err, deleted)=>{
            expect(deleted).to.equal(true).notify(done)
        })
    })
})