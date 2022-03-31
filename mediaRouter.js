const router = require('express').Router()
const url = require('url')
const fs  = require('fs')

router.get('/*',  function( req, res){
    const {pathname} = url.parse( req.url, true )
    console.log( Object.values( {pathname} )[0] )        
    const filepath = './resource' + Object.values( {pathname} )[0]
    console.log( filepath )        
    const readStream = fs.createReadStream( filepath )
    //const readStream = fs.createReadStream('./resource/bigbox.mp3')
    let time_info = new Date().getTime()
    console.log( time_info )
    console.log("ReadStream....")
    readStream.pipe(res)
})

router.post('/', function( req, res){
    const form = new multiparty.Form()
    form.on('error', err => res.status(500).end());
    form.on('part', part => {
        if(!part.filename)
            return part.resume()
        const filestream = fs.createWriteStream('./resource/${part.filename}')
        console.log("WriteStream....")
        part.pipe(filestream)    
    })
    form.on('close', ()=>res.end())
    form.parse(req)
})

module.exports = router

