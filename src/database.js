const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/imageGallery';

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(db => console.log('Connected to MongoDB'))
  .catch(e => console.log(e));

module.exports = mongoose;
