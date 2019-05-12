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
