const models = require('../models');
const pagination = require('../utils/pagination');

const createCita = async (req, res) => {
  try {
    await models.citas.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllCitas = async (req, res) => {
  try {
    const citas = await models.citas.findAll({
      model: models.citas,
    });
    let data = pagination(req.query.page, citas);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await models.citas.findOne({
      where: { cita_id: id },
      include: [
        {
          model: models.pacientes,
          as: 'pacientes',
        },
        { model: models.medicos, as: 'medicos' },
      ],
    });
    if (cita) {
      return res.status(200).json({ data: cita });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.citas.update(req.body, {
      where: { cita_id: id },
    });
    if (updated) {
      await models.citas.findOne({
        where: { cita_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.citas.destroy({
      where: { cita_id: id },
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
  createCita,
  getAllCitas,
  getCitaById,
  updateCita,
  deleteCita,
};
