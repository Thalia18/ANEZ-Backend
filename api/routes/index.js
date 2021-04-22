const { Router } = require('express');
const CapituloController = require('../controllers/capitulos');
const Categoriaontroller = require('../controllers/categorias');
const CitaController = require('../controllers/citas');
const ConsultorioController = require('../controllers/consultorios');
const CustomController = require('../controllers/custom');
const EspecialidadController = require('../controllers/especialidades');
const EstadoCivilController = require('../controllers/estados_civiles');
const EtniaController = require('../controllers/etnias');
const EvolucionController = require('../controllers/evoluciones');
const HistoriaClinicaController = require('../controllers/historias_clinicas');
const MedicoController = require('../controllers//medicos');
const NivelDeInstruccionController = require('../controllers/niveles_de_instruccion');
const PacienteController = require('../controllers/pacientes');
const RolController = require('../controllers/roles');
const SubcategoriaController = require('../controllers/subcategorias');
const TipoDeSangreController = require('../controllers/tipos_de_sangre');
const UsuarioController = require('../controllers/usuarios');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

//capitulos routes
router.post('/capitulo', CapituloController.createCapitulo);
router.get('/capitulos', CapituloController.getAllCapitulos);
router.get('/capitulo/:id', CapituloController.getCapituloById);
router.put('/capitulo/:id', CapituloController.updateCapitulo);
router.delete('/capitulo/:id', CapituloController.deleteCapitulo);

//categorias routes
router.post('/categoria', Categoriaontroller.createCategoria);
router.get('/categorias', Categoriaontroller.getAllCategorias);
router.get('/categoria/:id', Categoriaontroller.getCategoriaById);
router.put('/categoria/:id', Categoriaontroller.updateCategoria);
router.delete('/categoria/:id', Categoriaontroller.deleteCategoria);

//citas routes
router.post('/cita', CitaController.createCita);
router.get('/citas', CitaController.getAllCitas);
router.get('/cita/:id', CitaController.getCitaById);
router.put('/cita/:id', CitaController.updateCita);
router.delete('/cita/:id', CitaController.deleteCita);

//consultorios routes
router.post('/consultorio', ConsultorioController.createConsultorio);
router.get('/consultorios', ConsultorioController.getAllConsultorios);
router.get('/consultorio/:id', ConsultorioController.getConsultorioById);
router.put('/consultorio/:id', ConsultorioController.updateConsultorio);
router.delete('/consultorio/:id', ConsultorioController.deleteConsultorio);

//custom routes
router.get(
  '/evoluciones_historia/:id',
  CustomController.getAllEvolucionesPorHistoria
);
router.get('/confirm_user/:usuario/:contrasena', CustomController.confirmUser);
router.get('/autocomplete', CustomController.getAllPacientesAutocomplete);
router.get('/cedula_paciente/:cedula', CustomController.getPacientesPorCedula);
router.get('/historia_paciente/:id', CustomController.getHistoriaporIdPaciente);

router.get('/paciente_historia/:id', CustomController.getPacienteporIdHistoria);
router.get(
  '/evoluciones_autocomplete/:id',
  CustomController.getEvolucionesAutocomplete
);
router.get(
  '/evoluciones_fecha/:id/:fecha1/:fecha2',
  CustomController.getEvolucionesPorFecha
);
router.get('/citas_fecha/:fecha1/:fecha2', CustomController.getCitasPorFecha);
router.get(
  '/pacientes_buscar/:value',
  CustomController.getAllPacientesCedulaApellido
);
router.get('/citas_fecha/:fecha', CustomController.getAllCitasFecha);
router.get(
  '/medicos_especialidades/:id',
  CustomController.getMedicoPorEspecialidades
);
router.get('/medicos_usuario/:id', CustomController.getMedicoPorUsuario);
router.patch('/usuario_pass/:id/:email', CustomController.updateUsuarioPass);
router.get('/medicos_usuario_id/:id', CustomController.getMedicoPorUsuarioId);

//especialidades routes
router.post('/especialidad', EspecialidadController.createEspecialidad);
router.get('/especialidades', EspecialidadController.getAllEspecialidades);
router.get('/especialidad/:id', EspecialidadController.getEspecialidadById);
router.put('/especialidad/:id', EspecialidadController.updateEspecialidad);
router.delete('/especialidad/:id', EspecialidadController.deleteEspecialidad);

//estados civiles routes
router.post('/estado_civil', EstadoCivilController.createEstadoCivil);
router.get('/estados_civiles', EstadoCivilController.getAllEstadosCiviles);
router.get('/estado_civil/:id', EstadoCivilController.getEstadoCivilById);
router.put('/estado_civil/:id', EstadoCivilController.updateEstadoCivil);
router.delete('/estado_civil/:id', EstadoCivilController.deleteEstadoCivil);

//etnias routes
router.post('/etnia', EtniaController.createEtnia);
router.get('/etnias', EtniaController.getAllEtnias);
router.get('/etnia/:id', EtniaController.getEtniaById);
router.put('/etnia/:id', EtniaController.updateEtnia);
router.delete('/etnia/:id', EtniaController.deleteEtnia);

//evoluciones routes
router.post('/evolucion', EvolucionController.createEvolucion);
router.get('/evoluciones', EvolucionController.getAllEvoluciones);
router.get('/evolucion/:id', EvolucionController.getEvolucionById);
router.put('/evolucion/:id', EvolucionController.updateEvolucion);
router.delete('/evolucion/:id', EvolucionController.deleteEvolucion);

//medicos routes
router.post('/medico', MedicoController.createMedico);
router.get('/medicos', MedicoController.getAllMedicos);
router.get('/medico/:id', MedicoController.getMedicoById);
router.put('/medico/:id', MedicoController.updateMedico);
router.delete('/medico/:id', MedicoController.deleteMedico);

//historias clinicas routes
router.post(
  '/historia_clinica',
  HistoriaClinicaController.createHistoriaClinica
);
router.get(
  '/historias_clinicas',
  HistoriaClinicaController.getAllHistoriasClinicas
);
router.get(
  '/historia_clinica/:id',
  HistoriaClinicaController.getHistoriaClinicaById
);
router.put(
  '/historia_clinica/:id',
  HistoriaClinicaController.updateHistoriaClinica
);
router.delete(
  '/historia_clinica/:id',
  HistoriaClinicaController.deleteHistoriaClinica
);

//niveles de instruccion routes
router.post(
  '/nivel_de_instruccion',
  NivelDeInstruccionController.createNivelDeInstruccion
);
router.get(
  '/niveles_de_instruccion',
  NivelDeInstruccionController.getAllNivelesDeInstruccion
);
router.get(
  '/nivel_de_instruccion/:id',
  NivelDeInstruccionController.getNivelDeInstruccionById
);
router.put(
  '/nivel_de_instruccion/:id',
  NivelDeInstruccionController.updateNivelDeInstruccion
);
router.delete(
  '/nivel_de_instruccion/:id',
  NivelDeInstruccionController.deleteNivelDeInstruccion
);

//paciente routes
router.post('/paciente', PacienteController.createPaciente);
router.get('/pacientes', PacienteController.getAllPacientes);
router.get('/paciente/:id', PacienteController.getPacienteById);
router.put('/paciente/:id', PacienteController.updatePaciente);
router.delete('/paciente/:id', PacienteController.deletePaciente);

//roles routes
router.post('/rol', RolController.createRol);
router.get('/roles', RolController.getAllRoles);
router.get('/rol/:id', RolController.getRolById);
router.put('/rol/:id', RolController.updateRol);
router.delete('/rol/:id', RolController.deleteRol);

//subcategorias routes
router.post('/subcategoria', SubcategoriaController.createSubcategoria);
router.get('/subcategorias', SubcategoriaController.getAllSubcategorias);
router.get('/subcategoria/:id', SubcategoriaController.getSubcategoriaById);
router.put('/subcategoria/:id', SubcategoriaController.updateSubcategoria);
router.delete('/subcategoria/:id', SubcategoriaController.deleteSubcategoria);

//tipos de sangre routes
router.post('/tipo_de_sangre', TipoDeSangreController.createTipoDeSangre);
router.get('/tipos_de_sangre', TipoDeSangreController.getAllTiposDeSangre);
router.get('/tipo_de_sangre/:id', TipoDeSangreController.getTipoDeSangreById);
router.put('/tipo_de_sangre/:id', TipoDeSangreController.updateTipoDeSangre);
router.delete('/tipo_de_sangre/:id', TipoDeSangreController.deleteTipoDeSangre);

//usuarios routes
router.post('/usuario', UsuarioController.createUsuario);
router.get('/usuarios', UsuarioController.getAllUsuarios);
router.get('/usuario/:id', UsuarioController.getUsuarioById);
router.patch('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);

module.exports = router;
