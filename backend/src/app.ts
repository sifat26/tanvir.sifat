// src/app.ts
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import mainRouter from './app/routes';
import config from './config';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', config.frontendUrl].filter(Boolean) as string[],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ success: true, message: 'Server is healthy' });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ success: true, message: 'Portfolio API' });
});

app.use('/api/v1', mainRouter);

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessages: [{ path: req.originalUrl, message: 'The requested route does not exist.' }],
  });
});

export default app;
