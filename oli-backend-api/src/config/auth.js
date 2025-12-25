/**
 * Authentication Configuration
 * JWT and security settings
 */

const config = require('./env');

module.exports = {
  jwt: {
    secret: config.auth.jwtSecret,
    expiresIn: config.auth.jwtExpiresIn,
    refreshSecret: config.auth.jwtRefreshSecret,
    refreshExpiresIn: config.auth.jwtRefreshExpiresIn,
    algorithm: 'HS256',
    issuer: 'oli-platform',
    audience: 'oli-users'
  },

  bcrypt: {
    rounds: config.auth.bcryptRounds
  },

  session: {
    cookieName: 'oli_session',
    cookieMaxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: config.server.env === 'production',
    httpOnly: true,
    sameSite: 'lax'
  },

  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  }
};
