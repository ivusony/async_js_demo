const chai              =   require('chai');
const chaiAsPromised    = require('chai-as-promised');
const promiseTwo   = require('../promises/simple_chaining');
const racingPromises = require('../promises/racing_promises');

chai.use(chaiAsPromised);

const expect = chai.expect;
const should = chai.should;


describe('Testing promises', function() {
    this.timeout(7000);
    it('should return 10', function() {
        return expect(promiseTwo()).to.eventually.be.equal(5)
    })
})


describe('Testing racing promises', function() {
    this.timeout(4000);
    it('should resolve and return object', function(){
        return expect(racingPromises(
            'https://jsonplaceholder.typicode.com/posts/1', 'https://dog.ceo/api/breed/hound/images'
        )).to.be.fulfilled.and.to.be.instanceOf(Object)
    })

    it('should reject if URLs are bad on no URL passed', function(){
        return expect(racingPromises()).to.be.rejected
    })

})



