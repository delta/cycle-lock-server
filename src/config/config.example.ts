const config: config = {
  dauth: {
    DAUTH_CLIENT_ID: '',
    DAUTH_CLIENT_SECRET: '',
    DAUTH_CALLBACK_URL: '',
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
