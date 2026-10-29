import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import movieRouter from './routes/movies.js';

// Built frontend, served in production so the whole app runs on one port
const clientDist = fileURLToPath(new URL('../../client/dist', import.meta.url));

export const createApp = () => {
  const app = express();
  app.disable('x-powered-by');

  app.use('/api', movieRouter);
  app.all('/api/{*rest}', (_req, res) => {
    res.status(404).json({ success: false, msg: 'Not found' });
  });

  if (existsSync(clientDist)) {
    app.use(express.static(clientDist));
    // Let the client-side router handle every other path
    app.get('/{*rest}', (_req, res) => res.sendFile('index.html', { root: clientDist }));
  }

  return app;
};
