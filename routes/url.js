const express = require('express');
const router = express.Router();
const validurl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../model/Url');

// @route POST /encode
// @desc  Encodes a URL to a shortened URL
router.post('/encode', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    // Check Base URL
    if (!validurl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Create Url Code
    const urlCode = shortid.generate();

    // Check Long URL
    if (validurl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url.shortUrl);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                const url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save()

                res.json(url.shortUrl);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long URL');
    }

});

// @route POST /decode
// @desc  Decodes a shortened URL to its original URL
router.post('/decode', async (req, res) => {
    const { shortUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    // Check Base URL
    if (!validurl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Check Short URL
    if (validurl.isUri(shortUrl)) {
        try {
            let url = await Url.findOne({ shortUrl });

            if (url) {
                res.json(url.longUrl);
            } else {
                return res.status('404').json('No url found')
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid short url');
    }

});

// @route GET /statistic/:url_path
// @desc  Getting statistics of the url_path
router.get('/statistic/:url_path', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.url_path });

        if (url) {
            return res.json(url);
        } else {
            return res.status('401').json('Invalid url path')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;