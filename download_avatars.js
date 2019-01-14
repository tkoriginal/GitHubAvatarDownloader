const request = require('request');
const {GITHUB_TOKEN} = require('./secret');
const fs = require('fs');

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
    const users = JSON.parse(body)
    callback(err, users)
  });
}

getRepoContributors("jquery", "jquery", usersAvatarURL);

function usersAvatarURL(err, userData) {
  if (err) throw err;
  userData.forEach(user => {
    console.log(user.avatar_url)
  })
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg") 

function downloadImageByURL(url, filePath) {
  request(url)
    .on('err', err => {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}