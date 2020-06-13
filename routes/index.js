import users from './auth';
import business from "./business";
import upload from "./upload";
import statistics from './statistics';

export default (app) => {
    app.use('/api/v1', users);
    app.use('/api/v1', business);
    app.use('/api/v1', upload);
    app.use('/api/v1', statistics);
};
