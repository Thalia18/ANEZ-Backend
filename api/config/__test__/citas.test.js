const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { cita, citaUp } = require('./Mocks');

let token = '';
let refreshToken = '';

describe('Citas Endpoint', () => {
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

  // para pasar la prueba necesita cumplir con la condicion de unique hora por paciente y medico
  it('Crea un nueva cita', async (done) => {
    await request
      .post('/api/cita')
      .send(cita)
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

  it('Obtiene todas las citas', async (done) => {
    await request
      .get('/api/citas')
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

  it('Obtiene un cita por id', async (done) => {
    await request
      .get('/api/cita/4')
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

  it('Elimina un cita por id', async (done) => {
    await request
      .delete('/api/cita/15')
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
  it('Edita un cita', async (done) => {
    await request
      .put('/api/cita/4')
      .send(citaUp)
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
});
