import { Handler } from 'express';
import axios from 'axios';
import { URLSearchParams } from 'url';
import config from '../../config/config';
import prisma from '../../config/prismaClient';

const DAuthLogin: Handler = async (req, res) => {
  try {
    if (!req.query.code) {
      res.render('login', { msg: 'You have to allow the access to Login' });
    }
    try {
      const params = new URLSearchParams();
      params.append('client_id', config.dauth.DAUTH_CLIENT_ID);
      params.append('client_secret', config.dauth.DAUTH_CLIENT_SECRET);
      params.append('grant_type', 'authorization_code');
      params.append('code', String(req.query.code));
      params.append('redirect_uri', config.dauth.DAUTH_CALLBACK_URL);

      // get the access token
      const responseToken = await axios.post(
        'https://auth.delta.nitt.edu/api/oauth/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // get the user credentials
      const responseCredentials = await axios.post(
        'https://auth.delta.nitt.edu/api/resources/user',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + responseToken.data.access_token
          }
        }
      );
      const rollno = responseCredentials.data.email.substr(0, 9);
      const name = responseCredentials.data.name;
      //checking
      const user = await prisma.user.findUnique({
        where: {
          RollNo: parseInt(rollno)
        },
        select: {
          RollNo: true
        }
      });

      if (!user?.RollNo) {
        await prisma.user.create({
          data: {
            RollNo: parseInt(rollno),
            Name: name
          }
        });
      }
      res.redirect('/dashboard');
    } catch (error) {
      res.render('login', { msg: 'Unable to Login' });
    }
  } catch (error) {
    res.render('login', { msg: 'Unable to Login' });
  }
};

export default DAuthLogin;
