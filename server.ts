import express from 'express';
import logger from 'morgan';

import config from './config';

import db from './db'

import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.route';

const app: express.Application = express();

db.initialize();

app.use(logger(config.env));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./static'));

app.use('/', IndexRoute);
app.use('/auth', AuthRoute);

app.set('views', './View');
app.set('view engine', 'ejs');

app.listen(config.port, (): void => {
    console.log(`Listening at http://localhost:${config.port}/`);
});