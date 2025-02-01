import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(config.database_url as string);
    console.log('Database connection successful.');

    server = app.listen(config.port, () => {
      console.log(`Trust Auto Solution is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit immediately if an error occurs during startup
  }
}

main();

process.on('unhandledRejection', (error: any) => {
  const errorMessage =
    config.NODE_ENV === 'production'
      ? `${error.message}\n${error.stack} 😈 unhandledRejection is detected, shutting down ...`
      : '😈 unhandledRejection is detected, shutting down ...';

  console.error(errorMessage);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (error: any) => {
  const errorMessage =
    config.NODE_ENV === 'production'
      ? `${error.message}\n${error.stack} 😈 uncaughtException is detected, shutting down ...`
      : '😈 uncaughtException is detected, shutting down ...';

  console.error(errorMessage);
  process.exit(1);
});
