const users = require('./auth');
const business = require("./business");
const upload = require("./upload");
const statistics = require('./statistics');

module.exports = (app) => {
    app.use('/api/v1', users);
    app.use('/api/v1', business);
    app.use('/api/v1', upload);
    app.use('/api/v1', statistics);
};
