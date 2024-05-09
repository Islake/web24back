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
 * GET request handler for the root route.
 * @name GET /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

/**
 * GET request handler for the '/api/instagram-key' route.
 * @name GET /api/instagram-key
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
app.get('/api/instagram-key', (req, res) => {
  res.json({ key: process.env.INSTAGRAM_API_KEY });
});

app.use('/api/v1', api);

app.use('/docs', express.static('docs'));

export default app;
