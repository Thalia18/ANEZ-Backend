const bcrypt = require('bcrypt');
const models = require('../models');
const pagination = require('../utils/pagination');
const paginationEvolucion = require('../utils/pagination/paginateEvoluciones');

const sequelize = require('sequelize');
const Op = sequelize.Sequelize.Op;
// const { QueryTypes } = require('sequelize');
// const { sequelize } = require('../models');
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
const getAllFotosPorEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const fotos = await models.fotos.findAll({
      where: { evolucion_id: id },
      order: [['created_at', 'ASC']],
    });

    return res.status(200).json({
      data: fotos,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllFotosPorEvolucionP = async (req, res) => {
  try {
    const { id } = req.params;
    const fotos = await models.fotos.findAll({
      where: { evolucion_id: id },
      order: [['created_at', 'ASC']],
      attributes: ['foto_url'],
    });

    return res.status(200).json({
      data: fotos,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const confirmUser = async (req, res) => {
  try {
    let user = req.params.usuario;
    let password = req.params.contrasena;
    const usuario = await models.usuarios.findOne({
      where: { usuario: user },
      include: [
        {
          model: models.roles,
          as: 'rol',
        },
      ],
    });
    if (usuario) {
      const match = await bcrypt.compareSync(password, usuario.contrasena);
      if (match) {
        const medico = await models.medicos.findOne({
          where: { usuario_id: usuario.usuario_id },
        });
        return res.status(200).json({
          data: {
            isLoggedIn: true,
            usuario: usuario.usuario,
            rol: usuario.rol.rol,
            nombre: medico.nombre,
            apellido: medico.apellido,
            cedula: medico.cedula,
            consultorio_id: medico.consultorio_id,
            medico_id: medico.medico_id,
          },
        });
      }
    }
    return res.status(404).send('Password or username incorrect');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
const getAllPacientesAutocomplete = async (req, res) => {
  try {
    const pacientes = await models.pacientes.findAll({
      order: [['apellido', 'ASC']],
      attributes: ['nombre', 'apellido', 'cedula'],
    });
    let data = pagination(req.query.page, pacientes);
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

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
      order: [['apellido', 'ASC']],
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
const getEvolucionesAutocomplete = async (req, res) => {
  try {
    const { id } = req.params;
    const evoluciones = await models.evoluciones.findAll({
      where: { historia_clinica_id: id },
      attributes: ['evolucion_id', 'fecha', 'motivo_consulta', 'diagnostico'],
    });
    return res.status(200).json({
      data: evoluciones,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
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
    });

    return res.status(200).json({
      data: citas,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllCitasFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    var fechaF = fecha.split('-');
    var year = fechaF[0];
    var month = fechaF[1];
    var day = fechaF[2];
    var fecha1 = year + '-' + month + '-01';
    var fecha2 = year + '-' + month + '-' + day;
    console.log(fecha1, fecha2);
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
module.exports = {
  getAllEvolucionesPorHistoria,
  getAllFotosPorEvolucion,
  confirmUser,
  getAllPacientesAutocomplete,
  getPacientesPorCedula,
  getHistoriaporIdPaciente,
  getEvolucionesAutocomplete,
  getEvolucionesPorFecha,
  getPacienteporIdHistoria,
  getAllFotosPorEvolucionP,
  getCitasPorFecha,
  getAllPacientesCedulaApellido,
  getAllCitasFecha,
};
