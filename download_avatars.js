const request = require('request');

console.log(`Welcome to the GitHub Avatar Downloader!`);

function getRepoContributors (repoOwner, repoName, callback) {
  request(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`, 
    callback);
}

getRepoContributors("jquery", "jquery", function(error, response) {
  console.log('Errors:', error);
  console.log('Response:', response);
});