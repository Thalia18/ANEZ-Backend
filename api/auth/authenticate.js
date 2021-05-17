const token = require('./index');
const jwt = require('jsonwebtoken');
const refreshTokenSecret = token.refreshTokenSecret;

module.exports = {
  authenticateJWTMedAdmin: function (req, res, next) {
    const authHeader = req.headers.authorization;
    const auth = req.headers.auth;

    if (authHeader) {
      jwt.verify(authHeader, refreshTokenSecret, (err, user) => {
        if (user) {
          switch (auth) {
          }
          if (auth.trim() == 'MÉDICO' || auth.trim() === 'ADMINISTRADOR') {
            req.user = user;
            next();
          } else {
            return res.json({});
          }
        }
        if (err) {
          return res.json({ error: 'Forbidden' });
        }
      });
    } else {
      return res.json({ error: 'Unauthorized' });
    }
  },
  authenticateJWTAdmin: function (req, res, next) {
    const authHeader = req.headers.authorization;
    const auth = req.headers.auth;

    if (authHeader) {
      jwt.verify(authHeader, refreshTokenSecret, (err, user) => {
        if (user) {
          if (auth.trim() == 'ADMINISTRADOR') {
            req.user = user;
            next();
          } else {
            return res.json({});
          }
        }
        if (err) {
          return res.json({ error: 'Forbidden' });
        }
      });
    } else {
      return res.json({ error: 'Unauthorized' });
    }
  },

  authenticateJWTAll: function (req, res, next) {
    const authHeader = req.headers.authorization;
    const auth = req.headers.auth;
    if (authHeader) {
      jwt.verify(authHeader, refreshTokenSecret, (err, user) => {
        if (user) {
          if (
            auth.trim() == 'MÉDICO' ||
            auth.trim() === 'ADMINISTRADOR' ||
            auth.trim() === 'RECEPCIONISTA'
          ) {
            req.user = user;
            next();
          } else {
            return res.json({});
          }
        }
        if (err) {
          return res.json({ error: 'Forbidden' });
        }
      });
    } else {
      return res.json({ error: 'Unauthorized' });
    }
  },
};
