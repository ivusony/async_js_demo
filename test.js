const fs = require('fs');
const exec = require('child_process').exec;

process.stdin.on('readable', function(){
    let d = process.stdin.read();
    // if (d && d === 'q\n' ){
    //     process.stdin.pause()
    // }else if(d){
    //     process.stdout.write(typeof parseInt(d) + '\n')
    // }

    fs.readFile('./multitask.js', (err, buff)=>{
        let contents = buff.toString();
        exec(contents, (err, stdout, stderr ) => {
            console.log('done');
        });
        process.stdin.resume()
    })    

    
})

process.stdin.setEncoding('utf8');
