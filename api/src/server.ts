/*
 * Main entry point for the application
 */
import { createApp } from './app.js';

const PORT = Number(process.env.PORT) || 2500;

createApp().listen(PORT, () => console.log(`Server up and running, listening to port ${PORT}`));
