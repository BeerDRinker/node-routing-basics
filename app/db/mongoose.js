
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:user@ds157187.mlab.com:57187/test_task', {
    useMongoClient: true
});

module.exports = { mongoose };