const models = require('../models');

const createGenero = async (req, res) => {
  try {
    await models.generos.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllGeneros = async (req, res) => {
  try {
    const generos = await models.generos.findAll({
      offset: 1,
    });
    return res.status(200).json({ data: generos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getGeneroById = async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await models.generos.findOne({
      where: { genero_id: id },
    });
    if (genero) {
      return res.status(200).json({ data: genero });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.generos.update(req.body, {
      where: { genero_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.generos.destroy({
      where: { Genero_id: id },
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
  createGenero,
  getAllGeneros,
  getGeneroById,
  updateGenero,
  deleteGenero,
};
