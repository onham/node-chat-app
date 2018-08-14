// so timestamps here are all relative to the Unix Epic: Jan 1st 1970 00:00:00 AM
// so -1000 would be 1 second before the Epic start


const moment = require('moment');

const date = moment();   //creating moment object representing the current point in time

console.log(date.format('MMM Do, YYYY'));   //with MMM we are specifying the shorthand month -- check the moment docs


// we want to display 6:01 AM

console.log(date.format('h:mm a'));