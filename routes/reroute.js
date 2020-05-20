const router = require("express").Router();
const ShortUrl = require("../models/ShortUrl");
const Analytics = require("../models/Analytics");

router.get("/:sid", async (req, res) => {
    const { sid } = req.params;
    const short = await ShortUrl.findOne({ shortUrl: sid });
    if (short) {
        console.log("Rerouting");
        const full = short.fullUrl;
        res.redirect(full);
        const analytics = await Analytics.findOne({ short: sid });
        analytics.clicks++;
        analytics.save();
    } else {
        res.status(404).send("Url not found");
    }
});

module.exports = router;
