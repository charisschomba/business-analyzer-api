import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes';
import dbConnection from './utils/db';

dotenv.config();

// db connection
dbConnection();
// express app initialization
export const app = express();
// app middlewares
app.use(morgan('tiny'));
app.use(express.json());
const port = process.env.PORT || 8000;
// set up routes
routes(app)

app.listen(port, () => console.log(`Server running on ${port}`))              