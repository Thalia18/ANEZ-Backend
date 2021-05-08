const models = require('../models');

const createRol = async (req, res) => {
  try {
    await models.roles.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllRoles = async (req, res) => {
  try {
    const roles = await models.roles.findAll();
    return res.status(200).json({ data: roles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await models.roles.findOne({
      where: { rol_id: id },
    });
    if (rol) {
      return res.status(200).json({ data: rol });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.roles.update(req.body, {
      where: { rol_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.roles.destroy({
      where: { rol_id: id },
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
  createRol,
  getAllRoles,
  getRolById,
  updateRol,
  deleteRol,
};
