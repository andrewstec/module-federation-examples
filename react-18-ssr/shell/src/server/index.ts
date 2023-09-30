import express from 'express';
import initMiddleware from './middleware';

let httpServer;

const app = express();
const PORT = 3000;

global.clearRoutes = () => {
  app._router.stack = app._router.stack.filter((k) => !(k && k.route && k.route.path));
};

export const initializeServer = (callback: () => void = () => {}) => {
  if (httpServer) {
    httpServer.close(() => {
      console.log('Server closed! Re-initializing...');
      initMiddleware(express, app, callback);
      done(); // Restart the server
    });
  } else {
    console.log('Initializing server for the first time...');
    initMiddleware(express, app, callback);
    done(); // Start the server
  }
};



const done = () => {
  httpServer = app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
};

initMiddleware(express, app, done);

export default app;
