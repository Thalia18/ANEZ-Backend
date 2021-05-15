const bcrypt = require('bcrypt');
const models = require('../models');
const pagination = require('../utils/pagination');
const paginationEvolucion = require('../utils/pagination/paginateEvoluciones');
const paginationCitas = require('../utils/pagination/paginateCitas');
const sequelizer = require('sequelize');
const Op = sequelizer.Sequelize.Op;
const mail = require('../nodemailer');
const mailCitas = require('../nodemailer/notificaciones');

const { sequelize } = require('../models');
var generator = require('generate-password');

//recuperar evoluciones de acuerdo con el id de la historio clinica
const getAllEvolucionesPorHistoria = async (req, res) => {
  try {
    const { id } = req.params;
    const evoluciones = await models.evoluciones.findAll({
      where: { historia_clinica_id: id },
      order: [['fecha', 'DESC']],
    });
    let data = paginationEvolucion(req.query.page, evoluciones);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar pacientes de acuerdo a su cedula o apellido-nombre
const getAllPacientesCedulaApellido = async (req, res) => {
  var { value } = req.params;
  try {
    const pacientes = await models.pacientes.findAll({
      where: {
        [Op.or]: [
          {
            apellido: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            nombre: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            cedula: {
              [Op.iLike]: `%${value}%`,
            },
          },
        ],
      },
      order: [
        ['apellido', 'ASC'],
        ['nombre', 'ASC'],
      ],
      attributes: ['paciente_id', 'nombre', 'apellido', 'cedula', 'telefono'],
    });
    let data = pagination(req.query.page, pacientes);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar los pacientes de acuerdo a su cedula
const getPacientesPorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const paciente = await models.pacientes.findOne({
      where: { cedula: cedula },
    });
    return res.status(200).json({
      data: paciente,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar historias por id del paciente
const getHistoriaporIdPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const historiaClinica = await models.historias_clinicas.findOne({
      where: { paciente_id: id },
    });
    return res.status(200).json({
      data: historiaClinica,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar paciente de acuerdo a su historia clinica id
const getPacienteporIdHistoria = async (req, res) => {
  try {
    const { id } = req.params;
    const historiaClinica = await models.historias_clinicas.findOne({
      where: { historia_clinica_id: id },
      attributes: ['historia_clinica_id'],
      include: [
        {
          model: models.pacientes,
          as: 'pacientes',
        },
      ],
    });
    if (historiaClinica) {
      return res.status(200).json({ data: historiaClinica });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar todas las evoluciones por fecha
const getEvolucionesPorFecha = async (req, res) => {
  try {
    const { id, fecha1, fecha2 } = req.params;
    const evoluciones = await models.evoluciones.findAll({
      where: {
        historia_clinica_id: id,
        fecha: { [Op.between]: [fecha1, fecha2] },
      },
    });
    let data = paginationEvolucion(req.query.page, evoluciones);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar las citas entre 2 fechas
const getCitasPorFecha = async (req, res) => {
  try {
    const { fecha1, fecha2 } = req.params;
    const citas = await models.citas.findAll({
      where: {
        fecha: { [Op.between]: [fecha1, fecha2] },
      },
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
      order: [['fecha', 'ASC']],
    });
    let data = paginationCitas(req.query.page, citas);

    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar las citas por fecha - unicamente para medicos
const getCitasPorFechaMed = async (req, res) => {
  try {
    const { fecha1, fecha2, id } = req.params;
    const citas = await models.citas.findAll({
      where: {
        [Op.and]: [
          {
            fecha: { [Op.between]: [fecha1, fecha2] },
          },
          {
            medico_id: id,
          },
        ],
      },

      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
      order: [['fecha', 'ASC']],
    });
    let data = paginationCitas(req.query.page, citas);

    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar citas para calendario
const getAllCitasFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    var fechaF = fecha.split('-');
    var year = fechaF[0];
    var month = fechaF[1];
    var day = fechaF[2];
    var fecha1 = year + '-' + month + '-01';
    var fecha2 = year + '-' + month + '-' + day;
    const citas = await models.citas.findAll({
      where: { fecha: { [Op.between]: [fecha1, fecha2] } },
      order: [
        ['fecha', 'ASC'],
        ['hora', 'ASC'],
      ],
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
    });
    return res.status(200).json({
      data: citas,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar las citas para calendario - unicamente para medicos
const getAllCitasFechaMed = async (req, res) => {
  try {
    const { fecha, id } = req.params;
    var fechaF = fecha.split('-');
    var year = fechaF[0];
    var month = fechaF[1];
    var day = fechaF[2];
    var fecha1 = year + '-' + month + '-01';
    var fecha2 = year + '-' + month + '-' + day;
    const citas = await models.citas.findAll({
      where: {
        [Op.and]: [
          {
            fecha: { [Op.between]: [fecha1, fecha2] },
          },
          {
            medico_id: id,
          },
        ],
      },
      order: [
        ['fecha', 'ASC'],
        ['hora', 'ASC'],
      ],
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
    });
    return res.status(200).json({
      data: citas,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar todas las citas para las notificaciones
const getAllCitasNotificacion = async (req, res) => {
  try {
    const { fecha } = req.params;
    const actual = new Date();
    var fechaF = fecha.split('-');
    var year = fechaF[0];
    var month = fechaF[1];
    var day = fechaF[2];
    var fecha1 = year + '-' + month + '-' + actual.getDate();
    const citas = await models.citas.findAll({
      where: { fecha: { [Op.gte]: fecha1 } },
      order: [
        ['fecha', 'ASC'],
        ['hora', 'ASC'],
      ],
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
    });
    let data = paginationCitas(req.query.page, citas);

    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar todos los medicos de acuerdo a suu especialidad
const getMedicoPorEspecialidades = async (req, res) => {
  try {
    const { id } = req.params;
    const medicos = await sequelize.query(
      `select medico_id, nombre, apellido, medicos.usuario_id from usuarios, medicos, json_to_recordset(medicos.especialidad) as x(id int,value text) 
      where x.id = ${id} and usuarios.usuario_id=medicos.usuario_id`,
      {
        model: models.medicos,
        mapToModel: true,
      }
    );
    return res.status(200).json({
      data: medicos,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar los medicos de acuerdo a su usuario id
const getMedicoPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await sequelize.query(
      `select medico_id, nombre, apellido, medicos.usuario_id from usuarios, medicos where medico_id=${id} and usuarios.usuario_id=medicos.usuario_id`,
      {
        model: models.medicos,
        mapToModel: true,
      }
    );
    return res.status(200).json({
      data: medico,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//actualizar contraseña desde el admin
const updateUsuarioPass = async (req, res) => {
  try {
    const { id, email } = req.params;
    const [updated] = await models.usuarios.update(req.body, {
      where: { usuario_id: id },
    });
    if (updated) {
      mail(email, req.body.contrasena);
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar medico por su usuario id
const getMedicoPorUsuarioId = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await models.medicos.findOne({
      where: { usuario_id: id },
    });
    return res.status(200).json({
      data: medico,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar usuarios por su nombre-apellido o usuario
const getUsuariosPorApellidoNombreUsuario = async (req, res) => {
  var { value } = req.params;
  try {
    const usuarios = await models.usuarios.findAll({
      where: {
        [Op.or]: [
          {
            apellido: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            nombre: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            usuario: {
              [Op.iLike]: `%${value}%`,
            },
          },
        ],
      },
      order: [
        ['apellido', 'ASC'],
        ['nombre', 'ASC'],
      ],
      attributes: ['usuario_id', 'nombre', 'apellido', 'usuario'],
    });
    let data = pagination(req.query.page, usuarios);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//recuperar consultorios por su nombre o ruc
const getConsultoriosPorNombreyRuc = async (req, res) => {
  var { value } = req.params;
  try {
    const consultorios = await models.consultorios.findAll({
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            ruc: {
              [Op.iLike]: `%${value}%`,
            },
          },
        ],
      },
      order: [['nombre', 'ASC']],
    });
    let data = pagination(req.query.page, consultorios);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//cambiar contraseña olvidada
const recuperarPass = async (req, res) => {
  try {
    const username = req.body.usuario;
    const usuario = await models.usuarios.findOne({
      where: { usuario: username.trim() },
    });

    if (usuario) {
      const contrasena = generator
        .generate({
          length: 6,
          numbers: true,
        })
        .toUpperCase();
      const user = {
        usuario: usuario.usuario,
        contrasena: contrasena,
        rol_id: usuario.rol_id,
        nombre: usuario.nombre,
        email: usuario.email,
        fecha_nacimiento: usuario.fecha_nacimiento,
        consultorio_id: usuario.consultorio_id,
        cedula: usuario.cedula,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        createdAt: usuario.createdAt,
        updatedAt: new Date(),
      };
      const [updated] = await models.usuarios.update(user, {
        where: { usuario_id: usuario.usuario_id },
      });
      if (updated) {
        mail(usuario.email, contrasena);
        return res.status(200).json({ data: true, email: usuario.email });
      } else {
        return res.status(200).json({ data: false });
      }
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

//enviar notificaciones de recordatorios
const sendNotificacion = async (req, res) => {
  try {
    const { citas, direccion, telefono } = req.body;

    for (const i of citas) {
      const cita = await models.citas.findOne({
        where: { cita_id: i },
        attributes: ['paciente_id', 'fecha', 'hora'],
      });
      const paciente = await models.pacientes.findOne({
        where: { paciente_id: cita.paciente_id },
        attributes: ['email', 'nombre', 'apellido'],
      });
      mailCitas(
        paciente.email,
        cita.fecha,
        cita.hora,
        `${paciente.nombre} ${paciente.apellido}`,
        direccion,
        telefono
      );
    }
    return res.status(200).json({
      data: 'success',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

//recuperar usuario de acuerdo a su usuario
const getUsuarioPorUsername = async (req, res) => {
  try {
    const { value } = req.params;
    const usuario = await models.usuarios.findOne({
      where: { usuario: value },
      attributes: [
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'cedula',
        'usuario_id',
        'email',
        'telefono',
        'usuario',
      ],
    });
    return res.status(200).json({
      data: usuario,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

//actualizar email y telefono desde el perfil
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.usuarios.update(req.body, {
      where: { usuario_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePassPerfil = async (req, res) => {
  try {
    const { id, pass } = req.params;
    const usuario = await models.usuarios.findOne({
      where: { usuario_id: id },
    });
    const match = await bcrypt.compareSync(pass, usuario.contrasena);
    if (match) {
      try {
        const [updated] = await models.usuarios.update(req.body, {
          where: { usuario_id: id },
        });
        if (updated) {
          return res.status(200).json({ success: true });
        }
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCie10PorCodigoYDescripcion = async (req, res) => {
  var { value } = req.params;
  try {
    const cie10 = await models.subcategorias.findAll({
      where: {
        [Op.or]: [
          {
            codigo: {
              [Op.iLike]: `%${value}%`,
            },
          },
          {
            descripcion: {
              [Op.iLike]: `%${value}%`,
            },
          },
        ],
      },
      order: [['codigo', 'ASC']],
      limit: 10,
    });
    return res.status(200).json({
      data: cie10,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getHCPorCedulaNombreHC = async (req, res) => {
  var { value } = req.params;
  try {
    const hc = await sequelize.query(
      `select * from pacientes join historias_clinicas on pacientes.paciente_id = historias_clinicas.paciente_id 
      where (apellido ilike '%${value}%' or nombre ilike '%${value}%'  or cedula ilike '%${value}%') 
        order by apellido asc, nombre asc`,
      {
        model: models.pacientes,
        mapToModel: true,
      }
    );
    let data = pagination(req.query.page, hc);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const getAllHistorias = async (req, res) => {
  try {
    const hc = await sequelize.query(
      `select historia_clinica_id, nombre, apellido, pacientes.paciente_id from pacientes, historias_clinicas where pacientes.paciente_id=historias_clinicas.paciente_id order by apellido asc, nombre asc`,
      {
        model: models.medicos,
        mapToModel: true,
      }
    );
    let data = pagination(req.query.page, hc);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllEvolucionesPorHistoria,
  getPacientesPorCedula,
  getHistoriaporIdPaciente,
  getEvolucionesPorFecha,
  getPacienteporIdHistoria,
  getCitasPorFecha,
  getAllPacientesCedulaApellido,
  getAllCitasFecha,
  getMedicoPorEspecialidades,
  getMedicoPorUsuario,
  updateUsuarioPass,
  getMedicoPorUsuarioId,
  getUsuariosPorApellidoNombreUsuario,
  getConsultoriosPorNombreyRuc,
  getAllCitasFechaMed,
  getCitasPorFechaMed,
  recuperarPass,
  getAllCitasNotificacion,
  sendNotificacion,
  getUsuarioPorUsername,
  updateUser,
  updatePassPerfil,
  getCie10PorCodigoYDescripcion,
  getHCPorCedulaNombreHC,
  getAllHistorias,
};
