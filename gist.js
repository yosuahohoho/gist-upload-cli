const rl = require('readline-sync')
const fs = require('fs')
const rp = require('request-promise')
const path = require('path')

const userName = rl.question("Github Username: ")
const password = rl.question("Github Password: ", {
  hideEchoBack: false
})
const filePath = rl.questionPath("File Location: ", {
  isFile: true
})
const title = path.posix.basename(filePath)

try {
  const content = fs.readFileSync(filePath, 'utf8')

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
  
  rp(options)
      .then( response => console.log(response['html_url']))
      .catch( err => console.log(err.message))

} catch(err) {
  console.log('Error:', err.stack)
}

