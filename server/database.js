const mongoose = require('mongoose');
const dbURI =
  'mongodb+srv://erik_monjas:erik123@imagegallery-qreer.mongodb.net/test?retryWrites=true';

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(db => console.log('Connected to MongoDB'))
  .catch(e => console.log(e));

module.exports = mongoose;
