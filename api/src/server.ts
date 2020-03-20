/*
 * Main entry point for the application
 */
import express from 'express';

const PORT = 2500;
const app = express();

app.listen({ port: PORT }, () => console.log(`Server up and running, listening to port ${PORT}`));
