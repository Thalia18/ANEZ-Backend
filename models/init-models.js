var DataTypes = require('sequelize').DataTypes;
var _capitulos = require('./capitulos');
var _categorias = require('./categorias');
var _citas = require('./citas');
var _consultorios = require('./consultorios');
var _especialidades = require('./especialidades');
var _especialidades_medicos = require('./especialidades_medicos');
var _estados_civiles = require('./estados_civiles');
var _etnias = require('./etnias');
var _evoluciones = require('./evoluciones');
var _fotos = require('./fotos');
var _historias_clinicas = require('./historias_clinicas');
var _medicos = require('./medicos');
var _niveles_de_instruccion = require('./niveles_de_instruccion');
var _pacientes = require('./pacientes');
var _roles = require('./roles');
var _subcategorias = require('./subcategorias');
var _subcategorias_evoluciones = require('./subcategorias_evoluciones');
var _tipos_de_sangre = require('./tipos_de_sangre');
var _usuarios = require('./usuarios');

function initModels(sequelize) {
  var capitulos = _capitulos(sequelize, DataTypes);
  var categorias = _categorias(sequelize, DataTypes);
  var citas = _citas(sequelize, DataTypes);
  var consultorios = _consultorios(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var especialidades_medicos = _especialidades_medicos(sequelize, DataTypes);
  var estados_civiles = _estados_civiles(sequelize, DataTypes);
  var etnias = _etnias(sequelize, DataTypes);
  var evoluciones = _evoluciones(sequelize, DataTypes);
  var fotos = _fotos(sequelize, DataTypes);
  var historias_clinicas = _historias_clinicas(sequelize, DataTypes);
  var medicos = _medicos(sequelize, DataTypes);
  var niveles_de_instruccion = _niveles_de_instruccion(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var subcategorias = _subcategorias(sequelize, DataTypes);
  var subcategorias_evoluciones = _subcategorias_evoluciones(
    sequelize,
    DataTypes
  );
  var tipos_de_sangre = _tipos_de_sangre(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  medicos.belongsToMany(especialidades, {
    through: especialidades_medicos,
    foreignKey: 'medico_id',
    otherKey: 'especialidad_id',
  });
  especialidades.belongsToMany(medicos, {
    through: especialidades_medicos,
    foreignKey: 'especialidad_id',
    otherKey: 'medico_id',
  });
  subcategorias.belongsToMany(evoluciones, {
    through: subcategorias_evoluciones,
    foreignKey: 'subcategoria_id',
    otherKey: 'evolucion_id',
  });
  evoluciones.belongsToMany(subcategorias, {
    through: subcategorias_evoluciones,
    foreignKey: 'evolucion_id',
    otherKey: 'subcategoria_id',
  });
  categorias.belongsTo(capitulos, { foreignKey: 'capitulo_id' });
  capitulos.hasMany(categorias, { foreignKey: 'capitulo_id' });
  citas.belongsTo(medicos, { foreignKey: 'medico_id' });
  medicos.hasMany(citas, { foreignKey: 'medico_id' });
  citas.belongsTo(pacientes, { foreignKey: 'paciente_id' });
  pacientes.hasMany(citas, { foreignKey: 'paciente_id' });
  especialidades_medicos.belongsTo(especialidades, {
    foreignKey: 'especialidad_id',
  });
  especialidades.hasMany(especialidades_medicos, {
    foreignKey: 'especialidad_id',
  });
  especialidades_medicos.belongsTo(medicos, { foreignKey: 'medico_id' });
  medicos.hasMany(especialidades_medicos, { foreignKey: 'medico_id' });
  evoluciones.belongsTo(historias_clinicas, {
    foreignKey: 'historia_clinica_id',
  });
  historias_clinicas.hasMany(evoluciones, {
    foreignKey: 'historia_clinica_id',
  });
  fotos.belongsTo(evoluciones, { foreignKey: 'evolucion_id' });
  evoluciones.hasMany(fotos, { foreignKey: 'evolucion_id' });
  historias_clinicas.belongsTo(pacientes, { foreignKey: 'paciente_id' });
  pacientes.hasMany(historias_clinicas, { foreignKey: 'paciente_id' });
  medicos.belongsTo(consultorios, { foreignKey: 'consultorio_id' });
  consultorios.hasMany(medicos, { foreignKey: 'consultorio_id' });
  pacientes.belongsTo(estados_civiles, { foreignKey: 'estado_civil_id' });
  estados_civiles.hasMany(pacientes, { foreignKey: 'estado_civil_id' });
  pacientes.belongsTo(etnias, { foreignKey: 'etnia_id' });
  etnias.hasMany(pacientes, { foreignKey: 'etnia_id' });
  pacientes.belongsTo(niveles_de_instruccion, {
    foreignKey: 'nivel_de_instruccion_id',
  });
  niveles_de_instruccion.hasMany(pacientes, {
    foreignKey: 'nivel_de_instruccion_id',
  });
  pacientes.belongsTo(tipos_de_sangre, { foreignKey: 'tipo_de_sangre_id' });
  tipos_de_sangre.hasMany(pacientes, { foreignKey: 'tipo_de_sangre_id' });
  subcategorias.belongsTo(categorias, { foreignKey: 'categoria_id' });
  categorias.hasMany(subcategorias, { foreignKey: 'categoria_id' });
  subcategorias_evoluciones.belongsTo(evoluciones, {
    foreignKey: 'evolucion_id',
  });
  evoluciones.hasMany(subcategorias_evoluciones, {
    foreignKey: 'evolucion_id',
  });
  subcategorias_evoluciones.belongsTo(subcategorias, {
    foreignKey: 'subcategoria_id',
  });
  subcategorias.hasMany(subcategorias_evoluciones, {
    foreignKey: 'subcategoria_id',
  });
  usuarios.belongsTo(medicos, { foreignKey: 'medico_id' });
  medicos.hasMany(usuarios, { foreignKey: 'medico_id' });
  usuarios.belongsTo(roles, { foreignKey: 'rol_id' });
  roles.hasMany(usuarios, { foreignKey: 'rol_id' });

  return {
    capitulos,
    categorias,
    citas,
    consultorios,
    especialidades,
    especialidades_medicos,
    estados_civiles,
    etnias,
    evoluciones,
    fotos,
    historias_clinicas,
    medicos,
    niveles_de_instruccion,
    pacientes,
    roles,
    subcategorias,
    subcategorias_evoluciones,
    tipos_de_sangre,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
