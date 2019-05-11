
// @ts-ignore
const apiClient = require('./../api/apiClient')
const fs = require('fs')

let AVATAR_PATH = './assets/avatar'

let userAvatarPath = (userId: number) => {
  return `${AVATAR_PATH}/${userId}.jpg`
}

exports.saveAvatar = async (imageUrl: string, userId: number) => {
  let avatarBuffer = await apiClient.getFile(imageUrl)
  let splittedUrl = imageUrl.split('.')
  let format = `${splittedUrl[splittedUrl.length - 1]}`
  fs.appendFileSync(`${AVATAR_PATH}/${userId}.${format}`, new Buffer(avatarBuffer))
  return
}

exports.getAvatar = (userId: number) => {
  try {
    return fs.readFileSync(userAvatarPath(userId)).toString('base64')
  } catch (err) {
    return null
  }
}

exports.deleteAvatar = (userId: number) => {
  let success
  try {
    fs.unlinkSync(userAvatarPath(userId))
    success = true
  } catch (err) {
    success = false
  }
  return success
}
