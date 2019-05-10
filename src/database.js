const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/imageGallery';

mongoose
  .connect(dbURI)
  .then(db => console.log('Connected'))
  .catch(e => console.log(e));

module.exports = mongoose;
