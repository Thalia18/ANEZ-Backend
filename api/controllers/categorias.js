const models = require('../models');
const pagination = require('../utils/pagination');

const createCategoria = async (req, res) => {
  try {
    await models.categorias.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await models.categorias.findAll();
    return res.status(200).json({
      data: categorias,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await models.categorias.findOne({
      where: { categoria_id: id },
      include: [{ model: models.capitulos, as: 'capitulo' }],
    });
    if (categoria) {
      return res.status(200).json({ data: categoria });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.categorias.update(req.body, {
      where: { categoria_id: id },
    });
    if (updated) {
      await models.categorias.findOne({
        where: { categoria_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.categorias.destroy({
      where: { categoria_id: id },
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
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
