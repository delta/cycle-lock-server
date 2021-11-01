import session from 'express-session';
import express from 'express';

export const initSession = (app: express.Application): void => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      }
    })
  );
};
