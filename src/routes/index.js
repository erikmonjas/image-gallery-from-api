const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('/', async (req, res) => {
  const images = await Image.find();
  res.status(200).json(images);
});

router.post('', async (req, res) => {
  const imageToUpload = new Image({ ...req.body });
  console.log(imageToUpload);
  // try {
  //   await imageToUpload.save();
  // } catch {
  //   throw new Error('Invalid data');
  // }
  res.json({ status: 'OK' });
});

module.exports = router;
