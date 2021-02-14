const models = require('../models');
const pagination = require('../utils/pagination');

const createUsuario = async (req, res) => {
  try {
    await models.usuarios.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await models.usuarios.findAll();
    let data = pagination(req.query.page, usuarios);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await models.usuarios.findOne({
      where: { usuario_id: id },
      include: [
        { model: models.medicos, as: 'medico' },
        { model: models.roles, as: 'rol' },
      ],
    });
    if (usuario) {
      return res.status(200).json({ data: usuario });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.usuarios.update(req.body, {
      where: { usuario_id: id },
    });
    if (updated) {
      await models.usuarios.findOne({
        where: { usuario_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.usuarios.destroy({
      where: { usuario_id: id },
    });
    if (deleted) {
      return res.status(204).send('Deleted');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
