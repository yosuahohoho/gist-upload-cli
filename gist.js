const rl = require('readline-sync')

const userName = rl.question("Github Username: ")
const password = rl.question("Github Password: ", {
  hideEchoBack: true
})