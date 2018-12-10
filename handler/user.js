const rl = require('readline-sync')

const getName = () => {
  const name = rl.question("Github Username: ",{
    limit: function(input) { return input.length > 1 },
    limitMessage: "Please input your Github username.."
  })

  return name
}

const getPassword = () => {
  const password = rl.question("Github Password: ", {
    hideEchoBack: true,
    limit: function(input) { return input.length > 1 },
    limitMessage: "Please input your password"
  })

  return password
}

module.exports.getName = getName
module.exports.getPassword = getPassword