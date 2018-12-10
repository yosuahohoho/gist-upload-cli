const rl = require('readline-sync')
const path = require('path')

const getLocation = () => {
  const location = rl.questionPath("File Location: ", {
    isFile: true
  })

  return location
}

const getTitle = (location) => {
  return path.posix.basename(location)
}

module.exports.getLocation = getLocation
module.exports.getTitle = getTitle