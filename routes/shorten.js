const router = require('express').Router();
const ShortUrl = require('../models/ShortUrl');
const Analytics = require('../models/Analytics');

router.post('/shorten',async (req,res) => {
    console.log("Shortening url");
    const { url } = req.body;
    const find = await ShortUrl.findOne({fullUrl:url});
    //console.log(find);
    if(!find) {
        const short = ShortUrl({
            fullUrl: url,
        });
        try {
            const save = await short.save();
            res.status(201).send({status: true, url: save.shortUrl});
            const analytics = await Analytics({short: save.shortUrl}).save();
            console.log('Shortened URL generated!');
        } 
        catch(err) {
            console.log("Error in url generation");
            console.log(err);
            res.status(400).send({status: false, error: err});
        }
    }
    else {
        res.status(400).send({status: false, error: "URL already exists"});
        console.log("Shortened URL already exists");
    }
});

module.exports = router;