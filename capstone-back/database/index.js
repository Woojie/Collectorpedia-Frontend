const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//27017 is the default mongoDB port
const uri = 'mongodb+srv://wooj:123@users-ivylo.mongodb.net/test?retryWrites=true' 

mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => { 
    console.log('Connected to Mongo');
  },
  err => {
    console.log('error connecting to Mongo: ')
    console.log(err);
  }
)


module.exports = mongoose.connection