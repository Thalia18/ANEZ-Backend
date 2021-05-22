const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { cita, citaUp, citasNot } = require('./Mocks');

let token = '';
let refreshToken = '';

describe('Citas', () => {
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
  it('/cita', async (done) => {
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

  it('/notificaciones', async (done) => {
    await request
      .post('/api/notificaciones')
      .send(citasNot)
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

  it('/citas', async (done) => {
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

  it('/cita/:id', async (done) => {
    await request
      .get('/api/cita/1')
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

  it('/citas_fecha/:fecha1/:fecha2', async (done) => {
    await request
      .get('/api/citas_fechas/2020-01-01/2020-02-01')
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

  it('/citas_fechas_med/:fecha1/:fecha2/:id', async (done) => {
    await request
      .get('/api/citas_fechas_med/2020-01-01/2020-02-01/3')
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

  it('/cita/:id', async (done) => {
    await request
      .put('/api/cita/1')
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

  it('/cita/:id', async (done) => {
    await request
      .delete('/api/cita/9')
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
