const {Router} = require('express')
const router = Router()
const Jimp = require('jimp')

router.get('/',async (req,res)=>{
    try {
        res.render('index')    
    } catch (err) {
        console.log(err);
    }
})
router.post('/', async(req,res)=>{
    try {
        let imgRaw = 'public/raw/background.jpg' //626 626
        let imgActive = 'public/active/ramadan.jpg'
        let imgExported = 'public/export/image.jpg'
        
        let textData = {
            text: `${req.body.name}`.toUpperCase(),
            maxWidth:606,
            maxHeight:400,
            placementX:10,
            placementY:370
        }
        const clone = await Jimp.read(imgRaw)
        await clone.clone().write(imgActive)

        const active = await Jimp.read(imgActive)

        const font = await Jimp.loadFont('public/fonts/9Ye2FGJ16TfJoCvmU4bweCDf.ttf.fnt')

        const image = await active.print(font,textData.placementX,textData.placementY,{
            text:textData.text,
            alignmentX:Jimp.HORIZONTAL_ALIGN_CENTER
        },textData.maxWidth)
        await image.quality(100).write(imgExported)

        res.redirect('/succes') 
        } catch (err) {
            console.log(err);
        }
   
})
router.get('/succes', (req,res)=>{
    res.render('succes')
})

module.exports = router