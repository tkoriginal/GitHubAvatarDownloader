const request = require('request');
const {GITHUB_TOKEN} = require('./secret');
const fs = require('fs');

const [owner, repo] = process.argv.slice(2);

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

function usersAvatarURL(err, userData) {
  if (err) throw err;
  userData.forEach(user => {
    downloadImageByURL(user.avatar_url, `./avatars/${user.login}.jpg`)
  })
}

function downloadImageByURL(url, filePath) {
  request(url)
    .on('err', err => {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}

if (owner && repo) {
  getRepoContributors(owner, repo, usersAvatarURL);
} else {
  console.log('Please enter an Owner and Repo')
}

