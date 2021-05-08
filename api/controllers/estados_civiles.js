const models = require('../models');

const createEstadoCivil = async (req, res) => {
  try {
    await models.estados_civiles.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllEstadosCiviles = async (req, res) => {
  try {
    const estadosCiviles = await models.estados_civiles.findAll();
    return res.status(200).json({ data: estadosCiviles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getEstadoCivilById = async (req, res) => {
  try {
    const { id } = req.params;
    const estadoCivil = await models.estados_civiles.findOne({
      where: { estado_civil_id: id },
    });
    if (estadoCivil) {
      return res.status(200).json({ data: estadoCivil });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.estados_civiles.update(req.body, {
      where: { estado_civil_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.estados_civiles.destroy({
      where: { estado_civil_id: id },
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
  createEstadoCivil,
  getAllEstadosCiviles,
  getEstadoCivilById,
  updateEstadoCivil,
  deleteEstadoCivil,
};
