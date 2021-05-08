const models = require('../models');
const pagination = require('../utils/pagination');

const createCapitulo = async (req, res) => {
  try {
    await models.capitulos.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllCapitulos = async (req, res) => {
  try {
    const capitulos = await models.capitulos.findAll();
    let data = pagination(req.query.page, capitulos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCapituloById = async (req, res) => {
  try {
    const { id } = req.params;
    const capitulo = await models.capitulos.findOne({
      where: { capitulo_id: id },
    });
    if (capitulo) {
      return res.status(200).json({ data: capitulo });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCapitulo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.capitulos.update(req.body, {
      where: { capitulo_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCapitulo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.capitulos.destroy({
      where: { capitulo_id: id },
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
  createCapitulo,
  getAllCapitulos,
  getCapituloById,
  updateCapitulo,
  deleteCapitulo,
};
