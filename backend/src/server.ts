// src/server.ts
import app from './app';
import config from './config';
import { Server } from 'http';
import connectDB from './shared/mongoose';

let server: Server;

async function bootstrap() {
  try {
    await connectDB();
    const PORT = config.port || 5000;
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    if (server) server.close(() => process.exit(1));
    else process.exit(1);
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  if (server) server.close();
});
