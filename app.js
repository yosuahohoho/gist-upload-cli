const fs = require('fs')
const reqProm = require('request-promise')

const user = require('./handler/user')
const file = require('./handler/file')

// User information for basic authentication
const userName = user.getName()
const password = user.getPassword()

// Code snippet file
const fileLocation = file.getLocation()
const title = file.getTitle(fileLocation)

// Upload process to github gist
try {
  const content = fs.readFileSync(fileLocation, 'utf8')

  const options = {
    method: 'POST',
    uri: 'https://api.github.com/gists',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:63.0) Gecko/20100101 Firefox/63.0',
      'Authorization': "Basic " + Buffer.from(`${userName}:${password}`).toString('base64')
    },
    body: {
      'files': {
        [title]: {
          'content': content
        }
      }
    },
    json: true
  }
  
  reqProm(options)
      .then( response => console.log(response['html_url']))
      .catch( err => console.log(err.message))

} catch(err) {
  console.log('Error:', err.stack)
}
