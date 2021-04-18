const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

describe('Pacientes Endpoints', () => {
  //para pasar la prueba necesita cumplir con la condicion de unique cedula
  //   it('Crea un nuevo paciente', async () => {
  //     const res = await request.post('/api/paciente').send({
  //       tipo_de_sangre_id: 1,
  //       etnia_id: 1,
  //       nivel_de_instruccion_id: 1,
  //       estado_civil_id: 1,
  //       nombre: 'Andrea',
  //       apellido: 'A B ',
  //       cedula: '3221244980',
  //       fecha_nacimiento: '1992-11-25',
  //       lugar_nacimiento: 'Quito ',
  //       direccion: 'Nueva Floresta',
  //       telefono: '2524360',
  //       contacto_emergencia_nombre: 'Susana',
  //       contacto_emergencia_telefono: '0998364403',
  //       created_at: '2021-04-02T02:49:40.266Z',
  //       updated_at: '2021-04-02T02:49:40.266Z',
  //     });
  //     expect(res.statusCode).toEqual(201);
  //   });

  it('Obtiene todos los pacientes', async () => {
    const response = await request.get('/api/pacientes');
    expect(response.statusCode).toBe(200);
  });

  //   it('Obtiene un paciente por id', async (done) => {
  //     const response = await request.get('/api/paciente/3');
  //     expect(response.statusCode).toBe(200);
  //     done();
  //   });

  //   it('Elimina un paciente por id', async () => {
  //     const response = await request.delete('/api/paciente/1');
  //     expect(response.statusCode).toBe(204);
  //   });
  it('Edita un paciente', async () => {
    const res = await request.put('/api/paciente/101').send({
      tipo_de_sangre_id: 1,
      etnia_id: 1,
      nivel_de_instruccion_id: 1,
      estado_civil_id: 1,
      nombre: 'Andrea',
      apellido: 'Zapata ',
      cedula: '3221244980',
      fecha_nacimiento: '1992-11-25',
      lugar_nacimiento: 'Quito ',
      direccion: 'Nueva Floresta',
      telefono: '2524360',
      contacto_emergencia_nombre: 'Susana',
      contacto_emergencia_telefono: '0998364403',
      created_at: '2021-04-02T02:49:40.266Z',
      updated_at: '2021-04-02T02:49:40.266Z',
    });
    expect(res.statusCode).toBe(200);
  });
});
