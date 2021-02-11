export default {
  jwt: {
    secret: process.env.APP_SECRET || '52ee2a8a2bed7ff6d90e315a4fdb768a',
    expiresIn: '1d',
  },
};
