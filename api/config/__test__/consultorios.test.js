const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { consultorio, consultorioUp } = require('./Mocks');

let token = '';

describe('Consultorios Endpoint', () => {
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

  // para pasar la prueba necesita cumplir con la condicion de unique nombre
  it('Crea un nuevo consultorio', async (done) => {
    await request
      .post('/api/consultorio')
      .send(consultorio)
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

  it('Obtiene todos los consultorios', async (done) => {
    await request
      .get('/api/consultorios')
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

  it('Obtiene un consultorio por id', async (done) => {
    await request
      .get('/api/consultorio/2')
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

  it('Elimina un consultorio por id', async (done) => {
    await request
      .delete('/api/consultorio/3')
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
  it('Edita un consultorio', async (done) => {
    await request
      .put('/api/consultorio/2')
      .send(consultorioUp)
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
