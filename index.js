const express = require('express');
const morgan =  require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const fileupload = require('express-fileupload');

const routes = require('./routes');
const dbConnection = require('./utils/db');

dotenv.config();

// db connection
dbConnection();
// express app initialization
const app = express();
module.exports = app;
// app middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(fileupload());
app.use(cors());
const port = process.env.PORT || 8000;
// set up routes
routes(app)

app.listen(port, () => console.log(`Server running on ${port}`))
