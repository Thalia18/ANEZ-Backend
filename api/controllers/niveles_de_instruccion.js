const models = require('../models');

const createNivelDeInstruccion = async (req, res) => {
  try {
    await models.niveles_de_instruccion.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllNivelesDeInstruccion = async (req, res) => {
  try {
    const nivelesDeInstruccion = await models.niveles_de_instruccion.findAll();
    return res.status(200).json({ data: nivelesDeInstruccion });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getNivelDeInstruccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const nivelDeInstruccion = await models.niveles_de_instruccion.findOne({
      where: { nivel_de_instruccion_id: id },
    });
    if (NivelesDeInstruccion) {
      return res.status(200).json({ data: nivelDeInstruccion });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateNivelDeInstruccion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.niveles_de_instruccion.update(req.body, {
      where: { nivel_de_instruccion_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteNivelDeInstruccion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.niveles_de_instruccion.destroy({
      where: { nivel_de_instruccion_id: id },
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
  createNivelDeInstruccion,
  getAllNivelesDeInstruccion,
  getNivelDeInstruccionById,
  updateNivelDeInstruccion,
  deleteNivelDeInstruccion,
};
