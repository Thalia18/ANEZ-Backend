const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { evolucion, evolucionUp } = require('./Mocks');

let token = '';
let refreshToken = '';
describe('Evoluciones', () => {
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

  it('/evolucion', async (done) => {
    await request
      .post('/api/evolucion')
      .send(evolucion)
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

  it('/evoluciones', async (done) => {
    await request
      .get('/api/evoluciones')
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

  it('/evolucion/:id', async (done) => {
    await request
      .get('/api/evolucion/1')
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

  it('/evoluciones_fecha/:id/:fecha1/:fecha2', async (done) => {
    await request
      .get('/api/evoluciones_fecha/8/2020-01-01/2020-02-01')
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

  it('/cie10_sub/:value', async (done) => {
    await request
      .get('/api/cie10_sub/A0')
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

  it('/evolucion/:id ', async (done) => {
    await request
      .put('/api/evolucion/1')
      .send(evolucionUp)
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

  it('/evolucion/:id', async (done) => {
    await request
      .delete('/api/evolucion/6')
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
