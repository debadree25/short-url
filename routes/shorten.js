const router = require('express').Router();
const ShortUrl = require('../models/ShortUrl');

router.post('',async (req,res) => {
    console.log("Shortening url");
    const { url } = req.body;
    const short = ShortUrl({
        fullUrl: url,
    });
    try {
        const save = await short.save();
        res.status(201).send({short: save.shortUrl});
        console.log('Shortened URL generated!');
    } 
    catch(err) {
        console.log("Error in url generation");
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;