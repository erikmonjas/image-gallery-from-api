const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('', async (req, res) => {
  const imagesByPage = 1;
  const pageNumber = parseInt(req.query.page);
  let pageImages = [];

  if (req.query.lastID) {
    pageImages = await Image.find({ _id: { $gt: req.query.lastID } })
      .limit(imagesByPage)
      .sort({ $natural: -1 });
  } else {
    pageImages = await Image.find()
      .limit(imagesByPage)
      .sort({ $natural: -1 });
  }
  const mostRecentImages = pageImages.sort((a, b) => (b._id > a._id ? 1 : -1));
  const lastID = pageImages[pageImages.length - 1]._id;

  const resJSON = {
    data: mostRecentImages,
    pagination: {
      next: `http://localhost:3000/images?page=${pageNumber + 1}?lastID=${lastID}`,
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
