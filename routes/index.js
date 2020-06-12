import users from './auth';
import business from "./business";
import upload from "./upload"

export default (app) => {
    app.use('/api/v1', users);
    app.use('/api/v1', business);
    app.use('/api/v1', upload);

};
