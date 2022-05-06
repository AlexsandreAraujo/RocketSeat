import express, { response } from 'express';
import {helloword} from './routes';

const app = express();

app.get('/', (helloword));

app.listen(3333);