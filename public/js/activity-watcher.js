
function activityWatcher(){

    //number of seconds that have passed
    var secondsSinceLastActivity = 0;

    //1 hour. 60 x 60 = 3600 seconds /3
    var maxInactivity = (60 * 60 / 3);
    // var maxInactivity = (60 * 1 / 3);

    //Setup the setInterval method to run every second
    setInterval(function(){

        secondsSinceLastActivity++;
        // console.log(secondsSinceLastActivity * 3 + ' seconds since the user was last active');

        if(secondsSinceLastActivity > maxInactivity){
            console.log('User has been inactive for more than ' + maxInactivity + ' seconds');
            //Redirect them to your logout.php page.
            location.href = 'http://localhost:8080/logout';
            // location.href = 'https://chat-app-with-mongodb.herokuapp.com/logout'
        }
    }, 3000);

    //The function that will be called whenever a user is active
    function activity(){
        secondsSinceLastActivity = 0;
    }

    //registered user activitys.
    var activityEvents = [
        'mousedown', 'mousemove', 'keydown',
        'scroll', 'touchstart'
    ];

    //add these events to the document
    activityEvents.forEach(function(eventName) {
        document.addEventListener(eventName, activity, true);
    });


}

activityWatcher();