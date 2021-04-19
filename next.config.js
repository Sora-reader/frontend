const withPWA = require('next-pwa');
const dotenv = require('dotenv');

dotenv.config();

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  env: {
    API_URL: process.env.API_URL,
    CORS_Proxy: process.env.CORS_Proxy,
  },
});