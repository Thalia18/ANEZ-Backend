const models = require('../models');
const pagination = require('../utils/pagination');

const createSubcategoria = async (req, res) => {
  try {
    await models.subcategorias.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllSubcategorias = async (req, res) => {
  try {
    const subcategorias = await models.subcategorias.findAll({
      model: models.subcategorias,
    });
    let data = pagination(req.query.page, subcategorias);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSubcategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoria = await models.subcategorias.findOne({
      where: { subcategoria_id: id },
      include: [{ model: models.categorias, as: 'categoria' }],
    });
    if (subcategoria) {
      return res.status(200).json({ data: subcategoria });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.subcategorias.update(req.body, {
      where: { subcategoria_id: id },
    });
    if (updated) {
      await models.subcategorias.findOne({
        where: { subcategoria_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.subcategorias.destroy({
      where: { subcategoria_id: id },
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
  createSubcategoria,
  getAllSubcategorias,
  getSubcategoriaById,
  updateSubcategoria,
  deleteSubcategoria,
};
