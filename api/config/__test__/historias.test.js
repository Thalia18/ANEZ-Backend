const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const { historia, historiaUp } = require('./mockups');

let token = '';

describe('Historias clínicas Endpoint', () => {
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
    done();
  });

  // para pasar la prueba necesita cumplir con la condicion de unique historia por paciente
  it('Crea un nueva historia clínica', async (done) => {
    await request
      .post('/api/historia_clinica')
      .send(historia)
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

  it('Obtiene todas las historias clínicas', async (done) => {
    await request
      .get('/api/historias_clinicas')
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

  it('Obtiene una historia clínica por id', async (done) => {
    await request
      .get('/api/historia_clinica/1')
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

  it('Elimina una historia clínica por id', async (done) => {
    await request
      .delete('/api/historia_clinica/6')
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
  it('Edita una historia clínica', async (done) => {
    await request
      .put('/api/historia_clinica/1')
      .send(historiaUp)
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
