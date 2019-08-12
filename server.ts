import express from 'express';
import logger from 'morgan';

import db from './db'

import AuthRoute from './routes/auth.route';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 8080;

db.initialize();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./static'));

app.use('/auth', AuthRoute);

app.set('views', './View');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});