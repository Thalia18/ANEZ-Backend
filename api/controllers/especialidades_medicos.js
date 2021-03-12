const models = require('../models');
const pagination = require('../utils/pagination');

const createEspecialidadMedico = async (req, res) => {
  try {
    await models.especialidades_medicos.create(req.body);
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllEspecialidadesMedicos = async (req, res) => {
  try {
    const especialidadesMedicos = await models.especialidades_medicos.findAll();
    let data = pagination(req.query.page, especialidadesMedicos);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getEspecialidadMedicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const especialidadMedico = await models.especialidades_medicos.findOne({
      where: { medico_id: id },
      include: [
        {
          model: models.especialidades,
          as: 'especialidades',
          attributes: ['especialidad'],
        },
      ],
    });
    if (especialidadMedico) {
      return res.status(200).json({ data: especialidadMedico });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEspecialidadMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.especialidades_medicos.update(req.body, {
      where: { medico_id: id },
    });
    if (updated) {
      await models.especialidades_medicos.findOne({
        where: { medico_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEspecialidadMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.especialidades_medicos.destroy({
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
  createEspecialidadMedico,
  getAllEspecialidadesMedicos,
  getEspecialidadMedicoById,
  updateEspecialidadMedico,
  deleteEspecialidadMedico,
};
