var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Track = require('./models/Track');
var qs = require('querystring');
/*
 * GET userlist.
 */
router.get('/tracklist', function(req, res) {

    Track.find({},{},function(e,docs){
        res.json(docs);
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

/*
 * DELETE to deleteuser.
 */
router.delete('/deletetrack/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('trackstest');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;