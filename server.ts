import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import db from './db'

import IndexRoute from './controllers/index.controller';
import AuthRoute from './controllers/auth.controller';

const app: express.Application = express();

const dbName: string = process.env['DB_NAME'] ? process.env['DB_NAME'] : "dbdb"
const port: string | number = process.env['PORT'] ? process.env['PORT'] : 8080;

dotenv.config();
db.initialize(dbName);

app.use(logger('dev'));
app.use(logger('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('/static'));

app.use('/', IndexRoute);
app.use('/auth', AuthRoute);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, (): void => {
    console.log(`Listening at http://localhost:${port}/`);
});