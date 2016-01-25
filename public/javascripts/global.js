

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
   // populateTable();

    // Username link click
   //$('#userList table tbody').on('click', 'td a.linkshowuser', showTweetsInfo);

    // Add User button click
   $('#btnAddTracks').on('click', addTracks);
   $('#collectTweets').on('click', {source: document.getElementById('trackId')}, collectTweets);

});

// Functions =============================================================

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

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addTracks fieldset input').val('');

                // Update the table
                console.log("success!!");
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function collectTweets(trackword){
    event.preventDefault();
    console.log("collect tweets");
    var mytrack = trackword.data.source.text;
    $.ajax({
            type: 'GET',
            url: '/search/'+mytrack
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                console.log("success!!");
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
};




