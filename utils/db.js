import mongoose from 'mongoose';

export default () => {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('connected', () => console.log('db connection was successfully'));
    mongoose.connection.on('error', (error) =>  console.log('Error occured when connecting to db'))
}
