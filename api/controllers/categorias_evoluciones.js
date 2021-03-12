const models = require('../models');
const pagination = require('../utils/pagination');

const createCategoriaEvolucion = async (req, res) => {
  try {
    await models.categorias_evoluciones.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getCategoriasEvoluciones = async (req, res) => {
  try {
    const categoriasEvoluciones = await models.categorias_evoluciones.findAll();
    let data = pagination(req.query.page, categoriasEvoluciones);

    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCategoriaEvolucionById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriasEvoluciones = await models.categorias_evoluciones.findAll({
      where: { evolucion_id: id },
      include: [{ model: models.categorias, as: 'categorias' }],
    });
    if (categoriasEvoluciones) {
      return res.status(200).json({ data: categoriasEvoluciones });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCategoriaEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.categorias_evoluciones.update(req.body, {
      where: { evolucion_id: id },
    });
    if (updated) {
      await models.categorias_evoluciones.findOne({
        where: { evolucion_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCategoriaEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.categorias_evoluciones.destroy({
      where: { evolucion_id: id },
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
  createCategoriaEvolucion,
  getCategoriasEvoluciones,
  getCategoriaEvolucionById,
  updateCategoriaEvolucion,
  deleteCategoriaEvolucion,
};
