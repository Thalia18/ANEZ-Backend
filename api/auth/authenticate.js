const token = require('./index');
const jwt = require('jsonwebtoken');
const accessTokenSecret = token.accessTokenSecret;

module.exports = {
  authenticateJWTMedAdm: function (req, res, next) {
    const authHeader = req.headers.authorization;
    const auth = req.headers.auth;

    if (authHeader) {
      jwt.verify(authHeader, accessTokenSecret, (err, user) => {
        if (user) {
          switch (auth) {
          }
          if (auth == 'MÉDICO' || auth === 'ADMINISTRADOR') {
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
      jwt.verify(authHeader, accessTokenSecret, (err, user) => {
        if (user) {
          if (auth == 'ADMINISTRADOR') {
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
      jwt.verify(authHeader, accessTokenSecret, (err, user) => {
        if (user) {
          if (
            auth == 'RECEPCIONISTA' ||
            auth == 'MÉDICO' ||
            auth === 'ADMINISTRADOR'
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
