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
const fileName = path.posix.basename(filePath)


const options = {
  method: 'POST',
  uri: 'https://api.github.com/gists',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:63.0) Gecko/20100101 Firefox/63.0',
    'Authorization': "Basic " + Buffer.from(`${userName}:${password}`).toString('base64')
  },
  body: {
    'files': {
      fileName: {
        'content': fs.createReadStream(filePath)
      }
    }
  },
  json: true
}

rp(options)
    .then(response => console.log(response.status))
    .catch(err => console.log(err.message))