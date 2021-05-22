const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { pacienteUp, paciente } = require('./Mocks');

let token = '';
let refreshToken = '';

describe('Pacientes', () => {
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

  // // para pasar la prueba necesita cumplir con la condicion de unique cedula
  it('/paciente', async (done) => {
    await request
      .post('/api/paciente')
      .send(paciente)
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

  it('/pacientes', async (done) => {
    await request
      .get('/api/pacientes')
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

  it('/paciente/:id', async (done) => {
    await request
      .get('/api/paciente/2')
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

  it('/pacientes_buscar/:value', async (done) => {
    await request
      .get('/api/pacientes_buscar/0000')
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

  it('/paciente/:id', async (done) => {
    await request
      .put('/api/paciente/2')
      .send(pacienteUp)
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

  it('/paciente/:id', async (done) => {
    await request
      .delete('/api/paciente/17')
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
