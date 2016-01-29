// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('twitter'),
  routes = require('./routes'),
  tracks = require('./tracks'),
  analyser = require('./analyser'),
  config = require('./config'),
  qs = require('querystring'),
  streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;
// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweet2');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);
// Index Route
app.get('/', routes.index);
app.get('/twit', routes.twit);
app.get('/dashboard', routes.dashboard);
/*
* one Track
*/
app.get('/search/:id', function(req,res){
  var tracklist = req.params.id;
  console.log(tracklist);
  twit.stream('statuses/filter',{ track: tracklist}, function(stream){
    streamHandler(stream,io,tracklist);
  });
});

/*
* location
*/
app.post('/search', function(req,res){
    console.log("tracklist search");
    var body='';
    req.on('data', function(data){
        body+=data; 
    });
    
    
    req.on('end', function () {
        var post = qs.parse(body); 
        console.log("data track:"+post.track); 
        console.log("data tracklist:"+post.trackList);
        console.log("data location:"+post.location);
        if(post.track!==''){
          console.log("perform stream post track");
          twit.stream('statuses/filter',{ track: post.track}, function(stream){
            streamHandler(stream,io,post.track,'');
          });
        }
        if(post.trackList!==''){
          console.log("perform stream post tracklist");
          var trackarray = post.trackList.split(",");
          console.log("array:"+trackarray.toString());
          twit.stream('statuses/filter',{ track: trackarray.toString()}, function(stream){
            streamHandler(stream,io,post.trackList,'');
          });
        }
        if(post.location!==''){
          console.log("perform stream post location");

          var locationarray = post.location.split(",");
          console.log("array:"+locationarray.toString());
          twit.stream('statuses/filter',{ 'locations': locationarray.toString()}, function(stream){
            streamHandler(stream,io,'',post.location);
          });
        }

    });  
});


// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));
app.use('/tracks', tracks);
app.use('/analyser', analyser);
// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

