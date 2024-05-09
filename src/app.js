/**
 * Express application for the REST API.
 * @module app
 */
import express from 'express';
import api from './api/index.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('uploads'));

app.use(cors());

/**
 * @api {get} / Request root
 * @apiName GetRoot
 * @apiGroup Root
 *
 * @apiSuccess {String} message Welcome message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Welcome to my REST API!"
 *     }
 */
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

/**
 * @api {get} /api/instagram-key Get Instagram Key
 * @apiName GetInstagramKey
 * @apiGroup Instagram
 *
 * @apiSuccess {String} key Instagram API Key.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "key": "YOUR_INSTAGRAM_API_KEY"
 *     }
 */
app.get('/api/instagram-key', (req, res) => {
  res.json({ key: process.env.INSTAGRAM_API_KEY });
});

app.use('/api/v1', api);

app.use('/docs', express.static('docs'));

export default app;
