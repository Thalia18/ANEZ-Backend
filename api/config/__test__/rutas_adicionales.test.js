const supertest = require('supertest');
const app = require('../../index');
const { usuarioUp, citasNot } = require('./mockups');
const request = supertest(app);

let token = '';

describe('Adicionales Endpoint', () => {
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

  it('Obtiene todas las evoluciones por id de la historia clínica', async (done) => {
    await request
      .get('/api/evoluciones_historia/5')
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

  it('Obtiene la historia clínica por id del paciente', async (done) => {
    await request
      .get('/api/historia_paciente/8')
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

  it('Obtiene el paciente por id de la historia clínica', async (done) => {
    await request
      .get('/api/paciente_historia/8')
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

  it('Obtiene todos los pacientes de acuerdo a su apellido o número', async (done) => {
    await request
      .get('/api/pacientes_buscar/0000')
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

  it('Obtiene todas las evoluciones de acuerdo al id de la historia clínica y dentro de un rango de tiempo', async (done) => {
    await request
      .get('/api/evoluciones_fecha/8/2020-01-01/2020-02-01')
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

  it('Obtiene todas las citas dentro de un rango de tiempo', async (done) => {
    await request
      .get('/api/citas_fechas/2020-01-01/2020-02-01')
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

  it('Obtiene todas las citas dentro de un rango de tiempo y de acuerdo al id del médico', async (done) => {
    await request
      .get('/api/citas_fechas_med/2020-01-01/2020-02-01/3')
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

  it('Obtiene el médico por id de usuario', async (done) => {
    await request
      .get('/api/medicos_usuario/14')
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

  it('Obtiene todos los usuarios de acuerdo a su nombre, apellido o usuario', async (done) => {
    await request
      .get('/api/usuarios_buscar/zapata')
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

  it('Obtiene todos los consultorios de acuerdo a su nombre o ruc', async (done) => {
    await request
      .get('/api/consultorios_buscar/anez')
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

  it('Obtiene todos los usuario de acuerdo a su nombre de usuario', async (done) => {
    await request
      .get('/api/usuario_username/A1')
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

  it('Obtiene las 10 primeras subcategorias de CIE10 de acuerdo a su código o descripción ', async (done) => {
    await request
      .get('/api/cie10_sub/A0')
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

  it('Enviar recordatorios de citas', async (done) => {
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

  it('Actualizar datos de usuario ', async (done) => {
    await request
      .patch('/api/usuario_update/100')
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

  it('Cambiar contraseña', async (done) => {
    await request
      .patch('/api/usuario_pass/100/a@gmail.com')
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

  it('Recuperar contraseña', async (done) => {
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
