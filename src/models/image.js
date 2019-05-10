const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    type: {
      type: String,
      default: 'Image',
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    main_attachment: {
      big: {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isURL(value)) {
            throw new Error('Invalid URL');
          }
        },
      },
      small: {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isURL(value)) {
            throw new Error('Invalid URL');
          }
        },
      },
    },
    likes_count: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    links: [
      {
        rel: {
          type: String,
          required: true,
        },
        uri: {
          type: String,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error('Invalid URL');
            }
          },
        },
        methods: {
          type: String,
          required: true,
          enum: ['GET', 'POST'],
        },
      },
    ],
  },
  { timestamps: { createdAt: 'created_at' } },
);

module.exports = mongoose.model('Image', ImageSchema);

// {
//   "title": "Desert",
//     "author": "Erik",
//       "main_atachment": {
//     "big": "https://mir-s3-cdn-cf.behance.net/project_modules/1400/09ac6463937373.5ac21ad9c8c7c.jpg",
//       "small": "https://mir-s3-cdn-cf.behance.net/project_modules/1400/09ac6463937373.5ac21ad9c8c7c.jpg"
//   },
//   "links": [{
//     "rel": "avatar",
//     "uri": "http://lorempixel.com/250/250/",
//     "methods": "GET"
//   },
//   {
//     "rel": "like",
//     "uri": "http://localost:3000/images/Desert/like",
//     "methods": "GET"
//   }
//   ]
// }
