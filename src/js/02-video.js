import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

 const player = new Player(document.querySelector('iframe'));
const TIME_POINT = "videoplayer-current-time";

 // // ================= get 

const timePoint = function ({ seconds }) { localStorage.setItem(TIME_POINT, seconds )};   

player.on('timeupdate', throttle(timePoint, 1000));


// // ==============set

player.setCurrentTime(localStorage.getItem(TIME_POINT)).then(function() {
    // seconds = the actual time that the player seeked to
    console.log(seconds)
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

