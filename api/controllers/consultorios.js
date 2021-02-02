const models = require('../models');
const pagination = require('../utils/pagination');

const createConsultorio = async (req, res) => {
  try {
    await models.consultorios.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllConsultorios = async (req, res) => {
  try {
    const consultorios = await models.consultorios.findAll({
      model: models.consultorios,
    });
    let data = pagination(req.query.page, consultorios);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getConsultorioById = async (req, res) => {
  try {
    const { id } = req.params;
    const consultorio = await models.consultorios.findOne({
      where: { consultorio_id: id },
    });
    if (consultorio) {
      return res.status(200).json({ data: consultorio });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateConsultorio = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.consultorios.update(req.body, {
      where: { consultorio_id: id },
    });
    if (updated) {
      await models.consultorios.findOne({
        where: { consultorio_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteConsultorio = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.consultorios.destroy({
      where: { consultorio_id: id },
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
  createConsultorio,
  getAllConsultorios,
  getConsultorioById,
  updateConsultorio,
  deleteConsultorio,
};
