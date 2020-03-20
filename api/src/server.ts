/*
 * Main entry point for the application
 */
import express from 'express';
import movieRouter from './routes/movie';

const PORT = 2500;

const app = express();

app.use('/api/movie/', movieRouter);

// catch invalid routes
app.all('*', (request, response) => response.sendStatus(404));

app.listen({ port: PORT }, () => console.log(`Server up and running, listening to port ${PORT}`));
