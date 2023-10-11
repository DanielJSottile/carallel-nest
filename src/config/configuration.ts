export default () => ({
  port: Number(process.env.PORT) || 8080,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY || '18000s',
  },
});
