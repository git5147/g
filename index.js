// Set the access token and API endpoint for the GitHub API
var accessToken = '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';
//var apiEndpoint = 'https://api.github.com/repos/user5148/ul/index.txt';
var apiEndpoint = 'https://api.github.com/repos/user5148/ul/contents/';

// Get the user's location when the button is clicked
document.getElementById('button').addEventListener('click', function () {
  // Get the current time
  var time = new Date().toString();

  // Get the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var location = 'Latitude: ' + latitude + '\nLongitude: ' + longitude;
      createFile(location, time);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
});

// Create a new file with the location and time
function createFile(location, time) {
  // Get the current date and time
  var currentDate = new Date();
  // Format the date and time as a string in the format "YYYY-MM-DD_HH-mm-ss"
  var fileName = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0') + '_' + currentDate.getHours().toString().padStart(2, '0') + '-' + currentDate.getMinutes().toString().padStart(2, '0') + '-' + currentDate.getSeconds().toString().padStart(2, '0');

  // Send a request to the GitHub API to create a new file with the location and time
  var request = new XMLHttpRequest();
  request.open('POST', apiEndpoint);
  request.setRequestHeader('Authorization', 'Token ' + accessToken);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  };
  var data = JSON.stringify({
    'message': 'Add location data',
    'content': btoa(location + '\n' + time)
  });
  request.send(data);
}
