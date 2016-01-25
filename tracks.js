var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Track = require('./models/Track');
var Tweet = require('./models/Tweet');
var qs = require('querystring');
/*
 * GET userlist.
 */
router.get('/tracklist', function(req, res) {

    Track.find({},{},function(e,docs){
        res.json(docs);
    });
});
router.get('/tweetlist', function(req, res) {
    Tweet.find({},{},function(e,docs){
        console.log(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/addtrack', function(req, res) {
    if(req.method=='POST')
    var body = '';
    req.on('data', function(data){
        console.log(data);
        var temp=data.toString().split('&');
        console.log(temp[0])
        var newTrack = {
            customer: temp[0].split('=')[1],
            tracks  : temp[1].split('=')[1]
        };
        var trackEntry = new Track(newTrack);
        trackEntry.save(function(err, trackEntry){
            if(err){
                console.log(err);
            }
            console.dir(newTrack);
        });
    });
    
    
    req.on('end', function () {
            var post = qs.parse(body);
            res.redirect('/twit');
    });

    
});

module.exports = router;