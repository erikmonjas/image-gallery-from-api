const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('/', async (req, res) => {
  const images = await Image.find();
  res.status(200).json(images);
});

router.post('', async (req, res) => {
  const imageToUpload = new Image(req.body);
  try {
    await imageToUpload.save();
    res.status(200);
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }
  res.json({ status: 'OK' });
});

module.exports = router;
