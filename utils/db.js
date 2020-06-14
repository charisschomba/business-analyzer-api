const mongoose = require('mongoose');
// creates db connection
module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('connected', () => console.log('db connection was successfully'));
    mongoose.connection.on('error', (error) =>  console.log('Error occured when connecting to db'))
};
