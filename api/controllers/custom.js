const bcrypt = require('bcrypt');
const models = require('../models');
const pagination = require('../utils/pagination');

const getAllEvolucionesPorHistoria = async (req, res) => {
  try {
    const { id } = req.params;
    const evoluciones = await models.evoluciones.findAll({
      where: { historia_clinica_id: id },
      order: [['fecha', 'ASC']],
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
    let user = req.body.usuario;
    let password = req.body.contrasena;
    const usuario = await models.usuarios.findOne({
      where: { usuario: user },
    });
    if (usuario) {
      const match = await bcrypt.compareSync(password, usuario.contrasena);
      if (match) {
        return res.status(200).json({ usuario });
      }
    }
    return res.status(404).send('Password or username incorrect');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllPacientesAutocomplete = async (req, res) => {
  let list = [];
  try {
    const pacientes = await models.pacientes.findAll({
      order: [['apellido', 'ASC']],
      attributes: ['nombre', 'apellido', 'cedula'],
    });
    //array para autocomplet, concatenando nombre, apellido y cedula  ➜
    pacientes.forEach((element) => {
      let result = element.cedula
        .trim()
        .concat(' ➜ ')
        .concat(element.nombre.trim())
        .concat(' ')
        .concat(element.apellido.trim());
      list.push(result);
    });

    return res.status(200).json({
      data: list,
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
};
