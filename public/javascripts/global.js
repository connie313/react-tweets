// DOM Ready =============================================================
$(document).ready(function() {

    // Add User button click
   $('#btnAddTracks').on('click', addTracks);
   $('#collectTweets').on('click', {source: document.getElementById('trackId')}, collectTweets);
   $('#sentimentCalculate').on('click', {source: document.getElementById('trackId')}, sentimentCalculate);
   $('#btnCalcuTracks').on('click',calculate);
   $('#btnOneTracks').on('click', streamOneTracks);
});

// Functions =============================================================

//stream API
function streamOneTracks(event){
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
   
        var streamParam = {
            'track': $('#twitterStream fieldset input#inputOneTrack').val().toString(),
            'trackList': $('#twitterStream fieldset input#inputTracklist').val().toString(),
            'location': $('#twitterStream fieldset input#inputLocation').val().toString()  
        }
        // If it is, compile all user info into one object
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: streamParam,
            url: '/search',
            dataType: 'JSON'
        }).done(function( response ) {
            //logs
        });
    
    
};

//Calculate Sentiment
function sentimentCalculate(trackwords) {
    var mytrack = trackwords.data.source.text;
    console.log("sentimentCalculate:"+mytrack);
    $.ajax({
            type: 'POST',
            url: '/analyser/search'
        }).done(function( response ) {
            console.log("successful");
        });
};
//Calculate
function calculate(event){
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addTracks input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var newTrack = {
            'customer': $('#addTracks fieldset input#inputCustomer').val(),
            'tracks': $('#addTracks fieldset input#inputTracks').val()
        }
        // If it is, compile all user info into one object
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newTrack,
            url: '/analyser/search',
            dataType: 'JSON'
        }).done(function( response ) {
            //logs
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// Add User
function addTracks(event) {
    event.preventDefault();
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addTracks input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        var newTrack = {
            'customer': $('#addTracks fieldset input#inputCustomer').val(),
            'tracks': $('#addTracks fieldset input#inputTracks').val()
        }
       // If it is, compile all user info into one object
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newTrack,
            url: '/tracks/addtrack',
            dataType: 'JSON'
        }).done(function( response ) {
            console.log("Y");
            alert("Data:"+response);
            location.reload();
        });
    }
    else {
        // If errorCount is more than 0, error out
        
        alert('Please fill in all fields');
        return false;
    }
};

function collectTweets(trackword){
    
    console.log("collect tweets:"+trackword);
    var mytrack = trackword.data.source.text;
    console.log("collect tweets:"+mytrack);
    $.ajax({
            type: 'GET',
            url: '/search/'+mytrack
        }).done(function( response ) {
            // Check for successful (blank) response
            console.log("success!!");
        });
};




