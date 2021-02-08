const models = require('../models');
const pagination = require('../utils/pagination');

const createHistoriaClinica = async (req, res) => {
  try {
    await models.historias_clinicas.create(req.body);
    return res.status(200).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllHistoriasClinicas = async (req, res) => {
  try {
    const historiasClinicas = await models.historias_clinicas.findAll();
    let data = pagination(req.query.page, historiasClinicas);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getHistoriaClinicaById = async (req, res) => {
  try {
    const { id } = req.params;
    const historiaClinica = await models.historias_clinicas.findOne({
      where: { historia_clinica_id: id },
      include: [
        {
          model: models.pacientes,
          as: 'pacientes',
        },
      ],
    });
    if (historiaClinica) {
      return res.status(200).json({ data: historiaClinica });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateHistoriaClinica = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.historias_clinicas.update(req.body, {
      where: { historia_clinica_id: id },
    });
    if (updated) {
      await models.historias_clinicas.findOne({
        where: { historia_clinica_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteHistoriaClinica = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.historias_clinicas.destroy({
      where: { historia_clinica_id: id },
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
  createHistoriaClinica,
  getAllHistoriasClinicas,
  getHistoriaClinicaById,
  updateHistoriaClinica,
  deleteHistoriaClinica,
};
