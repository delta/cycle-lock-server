import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routers
import registrationRouter from './routes/registration';

import { initSession } from './config/session';

const port = process.env.PORT;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet Middleware
app.use(helmet());

// cors Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization'
    ]
  })
);

// Initialise session
initSession(app);

app.use('/register', registrationRouter);

app.use('/', async (req: Request, res: Response) => {
  res.render('dashboard');
});

try {
  app.listen(port, (): void => {
    console.log(`[server]: up and running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
