export default () => ({
  port: Number(process.env.PORT) || 8080,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY || '18000s',
  },
  news: {
    key: process.env.NEWS_API_KEY,
  },
  api: {
    key: process.env.APP_API_KEY,
  },
});
