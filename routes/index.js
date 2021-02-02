const { Router } = require('express');
const CapituloController = require('../controllers/capitulos');
const Categoriaontroller = require('../controllers/categorias');
const CitaController = require('../controllers/citas');
const ConsultorioController = require('../controllers/consultorios');
const EspecialidadController = require('../controllers/especialidades');
const EspecialidadMedicoController = require('../controllers/especialidades_medicos');
const EstadoCivilController = require('../controllers/estados_civiles');
const EtniaController = require('../controllers/etnias');
const EvolucionController = require('../controllers/evoluciones');
const FotoController = require('../controllers/fotos');
const HistoriaClinicaController = require('../controllers/historias_clinicas');
const MedicoController = require('../controllers//medicos');
const NivelDeInstruccionController = require('../controllers/niveles_de_instruccion');
const PacienteController = require('../controllers/pacientes');
const SubcategoriaEvolucionController = require('../controllers/subcategorias_evoluciones');
const SubcategoriaController = require('../controllers/subcategorias');
const TipoDeSangreontroller = require('../controllers/tipos_de_sangre');

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

//especialidades routes
router.post('/especialidad', EspecialidadController.createEspecialidad);
router.get('/especialidades', EspecialidadController.getAllEspecialidades);
router.get('/especialidad/:id', EspecialidadController.getEspecialidadById);
router.put('/especialidad/:id', EspecialidadController.updateEspecialidad);
router.delete('/especialidad/:id', EspecialidadController.deleteEspecialidad);

//especialidades_medicos routes
router.post(
  '/especialidad_medico',
  EspecialidadMedicoController.createEspecialidadMedico
);
router.get(
  '/especialidades_medicos',
  EspecialidadMedicoController.getAllEspecialidadesMedicos
);
router.get(
  '/especialidad_medico/:id',
  EspecialidadMedicoController.getEspecialidadMedicoById
);
router.put(
  '/especialidad_medico/:id',
  EspecialidadMedicoController.updateEspecialidadMedico
);
router.delete(
  '/especialidad_medico/:id',
  EspecialidadMedicoController.deleteEspecialidadMedico
);

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

//fotos routes
router.post('/foto', FotoController.createFoto);
router.get('/fotos', FotoController.getAllFotos);
router.get('/foto/:id', FotoController.getFotoById);
router.put('/foto/:id', FotoController.updateFoto);
router.delete('/foto/:id', FotoController.deleteFoto);

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

//subcategorias_evoluciones routes
router.post(
  '/subcategoria_evolucion',
  SubcategoriaEvolucionController.createSubcategoriaEvolucion
);
router.get(
  '/subcategorias_evoluciones',
  SubcategoriaEvolucionController.getSubcategoriasEvoluciones
);
router.get(
  '/subcategoria_evolucion/:id',
  SubcategoriaEvolucionController.getSubcategoriaEvolucionById
);
router.put(
  '/subcategoria_evolucion/:id',
  SubcategoriaEvolucionController.updateSubcategoriaEvolucion
);
router.delete(
  '/subcategoria_evolucion/:id',
  SubcategoriaEvolucionController.deleteSubcategoriaEvolucion
);

//subcategorias routes
router.post('/subcategoria', SubcategoriaController.createSubcategoria);
router.get('/subcategorias', SubcategoriaController.getAllSubcategorias);
router.get('/subcategoria/:id', SubcategoriaController.getSubcategoriaById);
router.put('/subcategoria/:id', SubcategoriaController.updateSubcategoria);
router.delete('/subcategoria/:id', SubcategoriaController.deleteSubcategoria);

//tipos de sangre routes
router.post('/tipo_de_sangre', TipoDeSangreontroller.createTipoDeSangre);
router.get('/tipos_de_sangre', TipoDeSangreontroller.getAllTiposDeSangre);
router.get('/tipo_de_sangre/:id', TipoDeSangreontroller.getTipoDeSangreById);
router.put('/tipo_de_sangre/:id', TipoDeSangreontroller.updateTipoDeSangre);
router.delete('/tipo_de_sangre/:id', TipoDeSangreontroller.deleteTipoDeSangre);

module.exports = router;
