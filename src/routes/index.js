const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('', async (req, res) => {
  const imagesByPage = 2;
  const pageNumber = parseInt(req.query.page);

  const pageImages = await Image.find()
    .skip(pageNumber * imagesByPage)
    .limit(imagesByPage)
    .sort({ $natural: -1 });

  const resJSON = {
    data: pageImages,
    pagination: {
      next: `http://localhost:3000/images?page=${pageNumber + 1}`,
      prev: pageNumber === 0 ? null : `http://localhost:3000/images?page=${pageNumber - 1}`,
    },
  };

  res.status(200).json(resJSON);
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
