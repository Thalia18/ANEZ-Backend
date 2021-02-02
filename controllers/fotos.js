const models = require('../models');
const pagination = require('../utils/pagination');

const createFoto = async (req, res) => {
  try {
    await models.fotos.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllFotos = async (req, res) => {
  try {
    const fotos = await models.fotos.findAll({
      model: models.fotos,
    });
    let data = pagination(req.query.page, fotos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getFotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const foto = await models.fotos.findOne({
      where: { foto_id: id },
      include: [
        {
          model: models.evoluciones,
          as: 'evolucion',
        },
      ],
    });
    if (foto) {
      return res.status(200).json({ data: foto });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateFoto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.fotos.update(req.body, {
      where: { foto_id: id },
    });
    if (updated) {
      await models.fotos.findOne({
        where: { foto_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteFoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.fotos.destroy({
      where: { foto_id: id },
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
  createFoto,
  getAllFotos,
  getFotoById,
  updateFoto,
  deleteFoto,
};
