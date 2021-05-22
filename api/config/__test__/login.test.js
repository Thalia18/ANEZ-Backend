const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { usuarioUp, citasNot } = require('./Mocks');

let token = '';

describe('Login', () => {
  // para pasar la prueba necesita cumplir con la condicion de unique hora por paciente y medico
  beforeAll(async (done) => {
    await request
      .post('/api/confirm_user')
      .send({
        usuario: 'A1',
        contrasena: 'Thalia18',
      })
      .then((response, err) => {
        if (response) {
          token = response.body.accessToken;
        } else {
          throw err;
        }
      });
    await request
      .post('/api/refresh_token')
      .send({
        headers: { Authorization: token },
      })
      .then((response, err) => {
        if (response) {
          refreshToken = response.body.refreshToken;
        } else {
          throw err;
        }
      });
    done();
  });

  it('/confirm_user', async (done) => {
    await request
      .post('/api/confirm_user')
      .send({
        usuario: 'A1',
        contrasena: 'Thalia18',
      })
      .then((response, err) => {
        if (response) {
          token = response.body.accessToken;
        } else {
          throw err;
        }
      });
    await request
      .post('/api/refresh_token')
      .send({
        headers: { Authorization: token },
      })
      .then((response, err) => {
        if (response) {
          refreshToken = response.body.refreshToken;
        } else {
          throw err;
        }
      });
    done();
  });
  it('/recuperar_pass', async (done) => {
    await request
      .post('/api/recuperar_pass')
      .send(usuarioUp)
      .set('Authorization', `${token}`)
      .set('auth', 'ADMINISTRADOR')
      .then((response, err) => {
        if (response) {
          expect(response.statusCode).toBe(200);
        } else {
          throw err;
        }
      });
    done();
  });
});
