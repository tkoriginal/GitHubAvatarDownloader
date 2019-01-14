const request = require('request');
const {GITHUB_TOKEN} = require('./secret');

console.log(`Welcome to the GitHub Avatar Downloader!`);

function getRepoContributors (repoOwner, repoName, callback) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + GITHUB_TOKEN
    }
  }
  request( options,(err, res, body) => {
    callback(err, body)
  });
}

getRepoContributors("jquery", "jquery", function(error, response) {
  console.log('Errors:', error);
  console.log('Response:', response);
});