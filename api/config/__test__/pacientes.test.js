const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { pacienteUp, paciente } = require('./Mocks');

let token = '';

describe('Pacientes Endpoint', () => {
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
  it('Crea un nuevo paciente', async (done) => {
    await request
      .post('/api/paciente')
      .send(paciente)
      .set('Authorization', `${token}`)
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

  it('Obtiene todos los pacientes', async (done) => {
    await request
      .get('/api/pacientes')
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

  it('Obtiene un paciente por id', async (done) => {
    await request
      .get('/api/paciente/2')
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

  it('Elimina un paciente por id', async (done) => {
    await request
      .delete('/api/paciente/5')
      .set('Authorization', `${token}`)
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
  it('Edita un paciente', async (done) => {
    await request
      .put('/api/paciente/2')
      .send(pacienteUp)
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
