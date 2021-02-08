const models = require('../models');
const pagination = require('../utils/pagination');

const createEvolucion = async (req, res) => {
  try {
    await models.evoluciones.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllEvoluciones = async (req, res) => {
  try {
    const evoluciones = await models.evoluciones.findAll();
    let data = pagination(req.query.page, evoluciones);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getEvolucionById = async (req, res) => {
  try {
    const { id } = req.params;
    const evolucion = await models.evoluciones.findOne({
      where: { evolucion_id: id },
      include: [
        {
          model: models.historias_clinicas,
          as: 'historiaclinica',
        },
      ],
    });
    if (evolucion) {
      return res.status(200).json({ data: evolucion });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.evoluciones.update(req.body, {
      where: { evolucion_id: id },
    });
    if (updated) {
      await models.evoluciones.findOne({
        where: { evolucion_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.evoluciones.destroy({
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
  createEvolucion,
  getAllEvoluciones,
  getEvolucionById,
  updateEvolucion,
  deleteEvolucion,
};
