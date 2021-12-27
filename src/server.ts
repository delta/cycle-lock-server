import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cycleRouter from './routes/cycle';
import usageRouter from './routes/usage';
import Auth from './routes/Auth';

const app: Application = express();
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routers
import registrationRouter from './routes/registration';

import { initSession } from './config/session';
// import { nextTick } from 'process';

require('ejs');

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

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

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
  );
  next();
});

// Dauth Check
app.use('/', Auth);

app.use('/register', registrationRouter);

app.use('/usage', usageRouter);

app.use('/fetch', cycleRouter);

app.use('/dashboard', async (req: Request, res: Response) => {
  res.render('dashboard');
});

try {
  app.listen(port, (): void => {
    console.log(`[server]: up and running on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
