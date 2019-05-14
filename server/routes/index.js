const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('', async (req, res) => {
  const imagesByPage = 8;
  const pageNumber = parseInt(req.query.page);

  try {
    const pageImages = await Image.find()
      .skip(pageNumber * imagesByPage)
      .limit(imagesByPage);
    // .sort({ $natural: -1 });

    const resJSON = {
      data: pageImages,
      pagination: {
        next: `http://localhost:3000/images?page=${pageNumber + 1}`,
        prev: pageNumber === 0 ? null : `http://localhost:3000/images?page=${pageNumber - 1}`,
      },
    };

    res.status(200).send(resJSON);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:title', async (req, res) => {
  try {
    const imageToFind = await Image.find({
      $or: [
        { title: { $regex: `.*${req.params.title}.*` } },
        { author: { $regex: `.*${req.params.title}.*` } },
      ],
    });

    res.status(200).send(imageToFind);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('', async (req, res) => {
  const title = req.body.title.toLowerCase();
  const author = req.body.author.toLowerCase();
  const imageData = {
    ...req.body,
    title,
    author,
  };
  const imageToUpload = new Image(imageData);
  try {
    await imageToUpload.save();
    res.status(201).send(imageToUpload);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('', async (req, res) => {
  try {
    const imageClicked = await Image.findOne({ _id: req.body.id });

    if (!imageClicked) {
      res.status(404).send("Couldn't find image");
    } else {
      if (req.body.action === 'like') {
        imageClicked.liked = true;
        imageClicked.likes_count = parseInt(imageClicked.likes_count) + 1;
      } else if (req.body.action === 'unlike') {
        if (parseInt(imageClicked.likes_count) > 1) {
          imageClicked.likes_count = parseInt(imageClicked.likes_count) - 1;
        } else if (parseInt(imageClicked.likes_count) === 1) {
          imageClicked.liked = false;
          imageClicked.likes_count = parseInt(imageClicked.likes_count) - 1;
        }
      }
      await imageClicked.save();
      res.status(200).send(imageClicked);
    }
  } catch (e) {
    res.status(500).send("Couldn't find image");
  }
});

module.exports = router;
