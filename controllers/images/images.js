const RandomString = require('../../module/RandomString').RandomString
const Path = require('path')

exports.ImagesCreate = (req, res) => {
    let Data = req.files.imagesData
    console.log(Data)
    
    // if ( !Data.mimetype.includes('image') ) {
    //     res.sendStatus(400)
    // } else {
        // let newName = RandomString(25) + Data.mimetype.replace('image/', '.')
        // let dirName = Path.join(__dirname, '../../public')
        // console.log(newName)
        // Data.mv(dirName + '/images/' + newName, function(err, result) {
        //     if (err) console.log(err)
        //     if (result) console.log('success')
        // })
    // }
}

exports.getImages = (req, res) => {
    res.send({
        images: '/images/' + 'qFr5u8W0G00lPc70nFHq186T9.jpeg'
    })
}