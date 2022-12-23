// Set the access token and API endpoint for the GitHub API
//var accessToken = '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';
//var apiEndpoint = 'https://api.github.com/repos/user5148/ul/index.txt';
//var apiEndpoint = 'https://api.github.com/repos/user5148/ul/contents/';

const accessToken = "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";
const username = "user5148";
const repository = "ul";

const button = document.getElementById("getLocation");
button.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geoLocation) {
    navigator.geoLocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const location = `Latitude: ${latitude}  Longitude: ${longitude}`;
  document.getElementById("location").innerHTML = location;

  createFile(location);
}

function createFile(location) {
  const date = new Date();
  const filename = `location-${date.toISOString()}.txt`;
  const content = location;
  const contentType = "text/plain";
  const commitMessage = "Add location data";

  const data = {
    message: commitMessage,
    content: btoa(content),
  };

  fetch(
    `https://api.github.com/repos/${username}/${repository}/contents/${filename}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log(`File "${filename}" created successfully.`);
      } else {
        console.error("Failed to create file.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
