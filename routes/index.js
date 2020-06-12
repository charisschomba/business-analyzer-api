import users from './auth';

export default (app) => {
    app.use('/api/v1', users);
};
