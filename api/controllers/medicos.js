const models = require('../models');
const pagination = require('../utils/pagination');

const createMedico = async (req, res) => {
  try {
    const medico = await models.medicos.create(req.body);
    return res.status(201).json({
      data: {
        medico_id: medico.medico_id,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllMedicos = async (req, res) => {
  try {
    const medicos = await models.medicos.findAll({
      include: [{ model: models.usuarios, as: 'usuario' }],
    });
    let data = pagination(req.query.page, medicos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getMedicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await models.medicos.findOne({
      where: { medico_id: id },
      include: [{ model: models.usuarios, as: 'usuario' }],
    });
    if (medico) {
      return res.status(200).json({ data: medico });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.medicos.update(req.body, {
      where: { medico_id: id },
    });
    if (updated) {
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.medicos.destroy({
      where: { medico_id: id },
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
  createMedico,
  getAllMedicos,
  getMedicoById,
  updateMedico,
  deleteMedico,
};
