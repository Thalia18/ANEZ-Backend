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
const GeneroController = require('../controllers/generos');
const HistoriaClinicaController = require('../controllers/historias_clinicas');
const MedicoController = require('../controllers//medicos');
const NivelDeInstruccionController = require('../controllers/niveles_de_instruccion');
const PacienteController = require('../controllers/pacientes');
const RolController = require('../controllers/roles');
const SubcategoriaController = require('../controllers/subcategorias');
const TipoDeSangreController = require('../controllers/tipos_de_sangre');
const UsuarioController = require('../controllers/usuarios');
const AuthController = require('../auth');

const {
  authenticateJWTAdmin,
  authenticateJWTAll,
  authenticateJWTMedAdmin,
} = require('../auth/authenticate');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

//authorization
router.post('/confirm_user', AuthController.confirmUser);
router.post('/refresh_token', AuthController.refreshToken);

router.post('/recuperar_pass', CustomController.recuperarPass);

//capitulos routes
router.post(
  '/capitulo',
  authenticateJWTAdmin,
  CapituloController.createCapitulo
);
router.get(
  '/capitulos',
  authenticateJWTMedAdmin,
  CapituloController.getAllCapitulos
);
router.get(
  '/capitulo/:id',
  authenticateJWTMedAdmin,
  CapituloController.getCapituloById
);
router.put(
  '/capitulo/:id',
  authenticateJWTAdmin,
  CapituloController.updateCapitulo
);
router.delete(
  '/capitulo/:id',
  authenticateJWTAdmin,
  CapituloController.deleteCapitulo
);

//categorias routes
router.post(
  '/categoria',
  authenticateJWTAdmin,
  Categoriaontroller.createCategoria
);
router.get(
  '/categorias',
  authenticateJWTMedAdmin,
  Categoriaontroller.getAllCategorias
);
router.get(
  '/categoria/:id',
  authenticateJWTMedAdmin,
  Categoriaontroller.getCategoriaById
);
router.put(
  '/categoria/:id',
  authenticateJWTAdmin,
  Categoriaontroller.updateCategoria
);
router.delete(
  '/categoria/:id',
  authenticateJWTAdmin,
  Categoriaontroller.deleteCategoria
);

//citas routes
router.post('/cita', authenticateJWTAll, CitaController.createCita);
router.get('/citas', authenticateJWTAll, CitaController.getAllCitas);
router.get('/cita/:id', authenticateJWTAll, CitaController.getCitaById);
router.put('/cita/:id', authenticateJWTAll, CitaController.updateCita);
router.delete('/cita/:id', authenticateJWTAll, CitaController.deleteCita);

//consultorios routes
router.post(
  '/consultorio',
  authenticateJWTAdmin,
  ConsultorioController.createConsultorio
);
router.get(
  '/consultorios',
  authenticateJWTAll,
  ConsultorioController.getAllConsultorios
);
router.get(
  '/consultorio/:id',
  authenticateJWTAll,
  ConsultorioController.getConsultorioById
);
router.put(
  '/consultorio/:id',
  authenticateJWTAdmin,
  ConsultorioController.updateConsultorio
);
router.delete(
  '/consultorio/:id',
  authenticateJWTAdmin,
  ConsultorioController.deleteConsultorio
);

//custom routes
router.get(
  '/evoluciones_historia/:id',
  authenticateJWTMedAdmin,
  CustomController.getAllEvolucionesPorHistoria
);
router.get(
  '/cedula_paciente/:cedula',
  authenticateJWTAll,
  CustomController.getPacientesPorCedula
);
router.get(
  '/historia_paciente/:id',
  authenticateJWTMedAdmin,
  CustomController.getHistoriaporIdPaciente
);

router.get(
  '/paciente_historia/:id',
  authenticateJWTMedAdmin,
  CustomController.getPacienteporIdHistoria
);

router.get(
  '/evoluciones_fecha/:id/:fecha1/:fecha2',
  authenticateJWTMedAdmin,
  CustomController.getEvolucionesPorFecha
);
router.get(
  '/citas_fechas/:fecha1/:fecha2',
  authenticateJWTAll,
  CustomController.getCitasPorFecha
);
router.get(
  '/citas_fechas_med/:fecha1/:fecha2/:id',
  authenticateJWTMedAdmin,
  CustomController.getCitasPorFechaMed
);
router.get(
  '/pacientes_buscar/:value',
  authenticateJWTAll,
  CustomController.getAllPacientesCedulaApellido
);
router.get(
  '/citas_fecha/:fecha',
  authenticateJWTAll,
  CustomController.getAllCitasFecha
);
router.get(
  '/citas_fecha_med/:fecha/:id',
  authenticateJWTMedAdmin,
  CustomController.getAllCitasFechaMed
);
router.get(
  '/citas_notificacion/:fecha',
  authenticateJWTAll,
  CustomController.getAllCitasNotificacion
);
router.post(
  '/notificaciones',
  authenticateJWTAll,
  CustomController.sendNotificacion
);
router.get(
  '/medicos_especialidades/:id',
  authenticateJWTAll,
  CustomController.getMedicoPorEspecialidades
);
router.get(
  '/medicos_usuario/:id',
  authenticateJWTAll,
  CustomController.getMedicoPorUsuario
);
router.patch(
  '/usuario_pass/:id/:email',
  authenticateJWTAdmin,
  CustomController.updateUsuarioPass
);
router.get(
  '/medicos_usuario_id/:id',
  authenticateJWTAdmin,
  CustomController.getMedicoPorUsuarioId
);
router.get(
  '/usuarios_buscar/:value',
  authenticateJWTAdmin,
  CustomController.getUsuariosPorApellidoNombreUsuario
);
router.get(
  '/consultorios_buscar/:value',
  authenticateJWTAdmin,
  CustomController.getConsultoriosPorNombreyRuc
);
router.get(
  '/usuario_username/:value',
  authenticateJWTAll,
  CustomController.getUsuarioPorUsername
);
router.patch(
  '/usuario_update/:id',
  authenticateJWTAll,
  CustomController.updateUser
);
router.patch(
  '/usuario_update_pass/:id/:value',
  authenticateJWTAll,
  CustomController.updatePassPerfil
);
router.get(
  '/cie10_sub/:value',
  authenticateJWTAll,
  CustomController.getCie10PorCodigoYDescripcion
);
router.get(
  '/hc_buscar/:value',
  authenticateJWTMedAdmin,
  CustomController.getHCPorCedulaNombreHC
);
router.get(
  '/historias',
  authenticateJWTMedAdmin,
  CustomController.getAllHistorias
);
router.get(
  '/medicos_buscar/:value',
  authenticateJWTAdmin,
  CustomController.getMedicosPorCedulaNombre
);

//especialidades routes
router.post(
  '/especialidad',
  authenticateJWTAdmin,
  EspecialidadController.createEspecialidad
);
router.get(
  '/especialidades',
  authenticateJWTAll,
  EspecialidadController.getAllEspecialidades
);
router.get(
  '/especialidad/:id',
  authenticateJWTAll,
  EspecialidadController.getEspecialidadById
);
router.put(
  '/especialidad/:id',
  authenticateJWTAdmin,
  EspecialidadController.updateEspecialidad
);
router.delete(
  '/especialidad/:id',
  authenticateJWTAdmin,
  EspecialidadController.deleteEspecialidad
);

//estados civiles routes
router.post(
  '/estado_civil',
  authenticateJWTAdmin,
  EstadoCivilController.createEstadoCivil
);
router.get(
  '/estados_civiles',
  authenticateJWTAll,
  EstadoCivilController.getAllEstadosCiviles
);
router.get(
  '/estado_civil/:id',
  authenticateJWTAll,
  EstadoCivilController.getEstadoCivilById
);
router.put(
  '/estado_civil/:id',
  authenticateJWTAdmin,
  EstadoCivilController.updateEstadoCivil
);
router.delete(
  '/estado_civil/:id',
  authenticateJWTAdmin,
  EstadoCivilController.deleteEstadoCivil
);

//etnias routes
router.post('/etnia', authenticateJWTAdmin, EtniaController.createEtnia);
router.get('/etnias', authenticateJWTAll, EtniaController.getAllEtnias);
router.get('/etnia/:id', authenticateJWTAll, EtniaController.getEtniaById);
router.put('/etnia/:id', authenticateJWTAdmin, EtniaController.updateEtnia);
router.delete('/etnia/:id', authenticateJWTAdmin, EtniaController.deleteEtnia);

//evoluciones routes
router.post(
  '/evolucion',
  authenticateJWTMedAdmin,
  EvolucionController.createEvolucion
);
router.get(
  '/evoluciones',
  authenticateJWTMedAdmin,
  EvolucionController.getAllEvoluciones
);
router.get(
  '/evolucion/:id',
  authenticateJWTMedAdmin,
  EvolucionController.getEvolucionById
);
router.put(
  '/evolucion/:id',
  authenticateJWTMedAdmin,
  EvolucionController.updateEvolucion
);
router.delete(
  '/evolucion/:id',
  authenticateJWTMedAdmin,
  EvolucionController.deleteEvolucion
);

//generos routes
router.post('/genero', authenticateJWTAdmin, GeneroController.createGenero);
router.get('/generos', authenticateJWTAll, GeneroController.getAllGeneros);
router.get('/genero/:id', authenticateJWTAll, GeneroController.getGeneroById);
router.put('/genero/:id', authenticateJWTAdmin, GeneroController.updateGenero);
router.delete(
  '/genero/:id',
  authenticateJWTAdmin,
  GeneroController.deleteGenero
);

//medicos routes
router.post('/medico', authenticateJWTAdmin, MedicoController.createMedico);
router.get('/medicos', authenticateJWTAdmin, MedicoController.getAllMedicos);
router.get('/medico/:id', authenticateJWTAdmin, MedicoController.getMedicoById);
router.put('/medico/:id', authenticateJWTAdmin, MedicoController.updateMedico);
router.delete(
  '/medico/:id',
  authenticateJWTAdmin,
  MedicoController.deleteMedico
);

//historias clinicas routes
router.post(
  '/historia_clinica',
  authenticateJWTMedAdmin,
  HistoriaClinicaController.createHistoriaClinica
);
router.get(
  '/historias_clinicas',
  authenticateJWTMedAdmin,
  HistoriaClinicaController.getAllHistoriasClinicas
);
router.get(
  '/historia_clinica/:id',
  authenticateJWTMedAdmin,
  HistoriaClinicaController.getHistoriaClinicaById
);
router.put(
  '/historia_clinica/:id',
  authenticateJWTMedAdmin,
  HistoriaClinicaController.updateHistoriaClinica
);
router.delete(
  '/historia_clinica/:id',
  authenticateJWTMedAdmin,
  HistoriaClinicaController.deleteHistoriaClinica
);

//niveles de instruccion routes
router.post(
  '/nivel_de_instruccion',
  authenticateJWTAdmin,
  NivelDeInstruccionController.createNivelDeInstruccion
);
router.get(
  '/niveles_de_instruccion',
  authenticateJWTAll,
  NivelDeInstruccionController.getAllNivelesDeInstruccion
);
router.get(
  '/nivel_de_instruccion/:id',
  authenticateJWTAll,
  NivelDeInstruccionController.getNivelDeInstruccionById
);
router.put(
  '/nivel_de_instruccion/:id',
  authenticateJWTAdmin,
  NivelDeInstruccionController.updateNivelDeInstruccion
);
router.delete(
  '/nivel_de_instruccion/:id',
  authenticateJWTAdmin,
  NivelDeInstruccionController.deleteNivelDeInstruccion
);

//paciente routes
router.post('/paciente', authenticateJWTAll, PacienteController.createPaciente);
router.get(
  '/pacientes',
  authenticateJWTAll,
  PacienteController.getAllPacientes
);
router.get(
  '/paciente/:id',
  authenticateJWTAll,
  PacienteController.getPacienteById
);
router.put(
  '/paciente/:id',
  authenticateJWTAll,
  PacienteController.updatePaciente
);
router.delete(
  '/paciente/:id',
  authenticateJWTMedAdmin,
  PacienteController.deletePaciente
);

//roles routes
router.post('/rol', authenticateJWTAdmin, RolController.createRol);
router.get('/roles', authenticateJWTAdmin, RolController.getAllRoles);
router.get('/rol/:id', authenticateJWTAdmin, RolController.getRolById);
router.put('/rol/:id', authenticateJWTAdmin, RolController.updateRol);
router.delete('/rol/:id', authenticateJWTAdmin, RolController.deleteRol);

//subcategorias routes
router.post(
  '/subcategoria',
  authenticateJWTAdmin,
  SubcategoriaController.createSubcategoria
);
router.get(
  '/subcategorias',
  authenticateJWTMedAdmin,
  SubcategoriaController.getAllSubcategorias
);
router.get(
  '/subcategoria/:id',
  authenticateJWTMedAdmin,
  SubcategoriaController.getSubcategoriaById
);
router.put(
  '/subcategoria/:id',
  authenticateJWTAdmin,
  SubcategoriaController.updateSubcategoria
);
router.delete(
  '/subcategoria/:id',
  authenticateJWTAdmin,
  SubcategoriaController.deleteSubcategoria
);

//tipos de sangre routes
router.post(
  '/tipo_de_sangre',
  authenticateJWTAdmin,
  TipoDeSangreController.createTipoDeSangre
);
router.get(
  '/tipos_de_sangre',
  authenticateJWTAll,
  TipoDeSangreController.getAllTiposDeSangre
);
router.get(
  '/tipo_de_sangre/:id',
  authenticateJWTAll,
  TipoDeSangreController.getTipoDeSangreById
);
router.put(
  '/tipo_de_sangre/:id',
  authenticateJWTAdmin,
  TipoDeSangreController.updateTipoDeSangre
);
router.delete(
  '/tipo_de_sangre/:id',
  authenticateJWTAdmin,
  TipoDeSangreController.deleteTipoDeSangre
);

//usuarios routes
router.post('/usuario', authenticateJWTAdmin, UsuarioController.createUsuario);
router.get('/usuarios', authenticateJWTAdmin, UsuarioController.getAllUsuarios);
router.get(
  '/usuario/:id',
  authenticateJWTAdmin,
  UsuarioController.getUsuarioById
);
router.patch(
  '/usuario/:id',
  authenticateJWTAdmin,
  UsuarioController.updateUsuario
);
router.delete(
  '/usuario/:id',
  authenticateJWTAdmin,
  UsuarioController.deleteUsuario
);

module.exports = router;
