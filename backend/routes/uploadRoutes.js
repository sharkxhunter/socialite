const express = require('express')
const router = express.Router()
const { cloudinary } = require('../utils/cloudinary')

router.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_preset',
      quality: 50,
    })
    console.log(uploadResponse)

    res.status(200).json(uploadResponse)
  } catch (err) {
    console.error(err)

    res.status(500)
    throw new Error('Something went wrong uploading your file')
  }
})
module.exports = router
