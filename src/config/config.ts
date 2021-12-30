const config: config = {
  dauth: {
    DAUTH_CLIENT_ID: 'FSh3w2n_N8jNtZGQ',
    DAUTH_CLIENT_SECRET: '1tL0sCDc9bMvnIA2kNimNqR3Y-EKRsuB',
    DAUTH_CALLBACK_URL: 'http://localhost:3001/dauth/callback',
    DAUTH_NONCE: ''
  }
};

interface config {
  dauth: {
    DAUTH_CLIENT_ID: string;
    DAUTH_CLIENT_SECRET: string;
    DAUTH_CALLBACK_URL: string;
    DAUTH_NONCE: string;
  };
}

export default config;
