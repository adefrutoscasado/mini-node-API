// @ts-ignore
const express = require('express')
const router = express.Router()

let {asyncWrap} = require('../utils/asyncWrap')
// @ts-ignore
let apiClient = require('./../api/apiClient')
let fileService = require('../src/services/fileService')

// @ts-ignore
router.get('/:userId(\\d+)', asyncWrap(async (req, res, next) => {
  let { userId } = req.params
  let user
  try {
    user = await apiClient.getUser(userId)
  } catch (err) {
    if (err.response.status === 404) return res.status(404).json({message: 'User not found'})
  }
  await fileService.saveAvatar(user.avatar, userId)
  return res.json(user)
}))

// @ts-ignore
router.get('/:userId(\\d+)/avatar', async (req, res, next) => {
  let { userId } = req.params
  let avatar
  avatar = await fileService.getAvatar(userId)
  if (!avatar) {
    let response
    try {
      response = await apiClient.getUser(userId)
    } catch (err) {
      if (err.response.status === 404) return res.status(404).json({message: 'User not found'})
    }
    await fileService.saveAvatar(response.avatar, userId)
    avatar = await fileService.getAvatar(userId)
  }
  return res.json({avatar})
})

// @ts-ignore
router.delete('/:userId(\\d+)/avatar', async (req, res, next) => {
  let { userId } = req.params
  let success = await fileService.deleteAvatar(userId)
  if (!success) {
    return res.status(404).json({message: 'Avatar not found'})
  }
  return res.json({message: 'User avatar deleted successfully'})
})

module.exports = router
