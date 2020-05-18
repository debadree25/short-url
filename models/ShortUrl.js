const mongoose = require('mongoose');
const shortid = require('shortid');
 
const ShortUrl = mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortid.generate
    }
});

module.exports = mongoose.model('ShortUrl',ShortUrl);