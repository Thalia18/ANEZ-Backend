const models = require('../models');
const pagination = require('../utils/pagination');

const createEspecialidad = async (req, res) => {
  try {
    await models.especialidades.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
};
const getAllEspecialidades = async (req, res) => {
  try {
    const especialidades = await models.especialidades.findAll();
    return res.status(200).json({
      data: especialidades,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getEspecialidadById = async (req, res) => {
  try {
    const { id } = req.params;
    const especialidad = await models.especialidades.findOne({
      where: { especialidad_id: id },
    });
    if (especialidad) {
      return res.status(200).json({ data: especialidad });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.especialidades.update(req.body, {
      where: { especialidad_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.especialidades.destroy({
      where: { especialidad_id: id },
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
  createEspecialidad,
  getAllEspecialidades,
  getEspecialidadById,
  updateEspecialidad,
  deleteEspecialidad,
};
