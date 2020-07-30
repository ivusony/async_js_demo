function Emitter(){
    this.events = {}
}

Emitter.prototype.on = function(type, cb){
    this.events[type] ? this.events[type] : this.events[type]=[]
    this.events[type].push(cb)
}

Emitter.prototype.emit = function(type){
    this.events[type].forEach(cb=>{
        cb()
    })
}


const myEmitter = new Emitter();

myEmitter.on('data', function(){
    console.log('First callback');
})

myEmitter.on('data', function(){
    console.log('Second callback');
})

myEmitter.emit('data')