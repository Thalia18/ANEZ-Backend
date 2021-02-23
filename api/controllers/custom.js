const bcrypt = require('bcrypt');
const models = require('../models');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Sequelize.Op;
// const { QueryTypes } = require('sequelize');

const getAllEvolucionesPorHistoria = async (req, res) => {
  try {
    const { id } = req.params;
    const evoluciones = await models.evoluciones.findAll({
      where: { historia_clinica_id: id },
      order: [['fecha', 'DESC']],
    });
    let data = pagination(req.query.page, evoluciones);
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
    let data = pagination(req.query.page, fotos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
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
        {
          model: models.medicos,
          as: 'medico',
        },
      ],
    });
    if (usuario) {
      const match = await bcrypt.compareSync(password, usuario.contrasena);
      if (match) {
        return res.status(200).json({
          data: {
            isLoggedIn: true,
            usuario: usuario.usuario,
            rol: usuario.rol.rol,
            nombre: usuario.medico.nombre,
            apellido: usuario.medico.apellido,
            cedula: usuario.medico.cedula,
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
    return res.status(200).json({
      data: pacientes,
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
const evolucionesPorFecha = async (req, res) => {
  try {
    const { id, fecha1, fecha2 } = req.params;
    let inicio;
    let final;
    if (fecha1 < fecha2) {
      inicio = fecha1;
      final = fecha2;
    } else {
      inicio = fecha2;
      final = fecha1;
    }
    const evoluciones = await models.evoluciones.findAll({
      where: {
        historia_clinica_id: id,
        fecha: { [Op.between]: [inicio, final] },
      },
    });
    let data = pagination(req.query.page, evoluciones);
    return res.status(200).json({
      data: data,
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
  evolucionesPorFecha,
};
