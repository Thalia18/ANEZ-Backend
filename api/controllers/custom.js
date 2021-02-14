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
