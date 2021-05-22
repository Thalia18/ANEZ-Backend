const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { medicoUp, medico } = require('./Mocks');

let token = '';
let refreshToken = '';

describe('Médicos', () => {
  beforeAll(async (done) => {
    await request
      .post('/api/confirm_user')
      .send({
        usuario: 'THZAPATA847',
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

  // // para pasar la prueba necesita cumplir con la condicion de unique cedula
  it('/medico', async (done) => {
    await request
      .post('/api/medico')
      .send(medico)
      .set('Authorization', `${refreshToken}`)
      .set('auth', 'ADMINISTRADOR')
      .then((response, err) => {
        if (response) {
          expect(response.statusCode).toBe(201);
        } else {
          throw err;
        }
      });

    done();
  });

  it('/medicos_usuario/:id', async (done) => {
    await request
      .get('/api/medicos_usuario/23')
      .set('Authorization', `${refreshToken}`)
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

  it('/medico/:id', async (done) => {
    await request
      .put('/api/medico/6')
      .send(medicoUp)
      .set('Authorization', `${refreshToken}`)
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

  it('/medico/:id', async (done) => {
    await request
      .delete('/api/medico/7')
      .set('Authorization', `${refreshToken}`)
      .set('auth', 'ADMINISTRADOR')
      .then((response, err) => {
        if (response) {
          expect(response.statusCode).toBe(204);
        } else {
          throw err;
        }
      });
    done();
  });
});
