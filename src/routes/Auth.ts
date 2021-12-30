import express, { Router, Request, Response } from 'express';
import config from '../config/config';

import DAuthLogin from '../controllers/Auth/DAuthLogin';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.render('login', { msg: null });
});

router.get('/student/login/dauth', (req, res) => {
  res.redirect(
    `https://auth.delta.nitt.edu/authorize?client_id=${
      config.dauth.DAUTH_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      config.dauth.DAUTH_CALLBACK_URL
    )}&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=${
      config.dauth.DAUTH_NONCE
    }`
  );
});

router.get('/dauth/callback', DAuthLogin);

export default router;
