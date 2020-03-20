/*
 * Main entry point for the application
 */
import express from 'express';

const PORT = 2500;
const app = express();

// catch invalid routes
app.all('*', (request, response) => response.sendStatus(404));

app.listen({ port: PORT }, () => console.log(`Server up and running, listening to port ${PORT}`));
