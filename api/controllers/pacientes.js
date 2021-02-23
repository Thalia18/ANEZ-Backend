const models = require('../models');
const pagination = require('../utils/pagination');

const createPaciente = async (req, res) => {
  try {
    const paciente = await models.pacientes.findOne({
      where: { cedula: req.body.cedula },
    });
    console.log(paciente, 'paciente por cedula');
    if (paciente !== null) {
      return res.status(200).json({
        data: {
          exist: true,
        },
      });
    } else {
      await models.pacientes.create(req.body);
      return res.status(200).json({
        data: {
          exist: false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await models.pacientes.findAll({
      order: [['apellido', 'ASC']],
    });
    let data = pagination(req.query.page, pacientes);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const pacient = await models.pacientes.findOne({
      where: { paciente_id: id },
      include: [
        {
          model: models.etnias,
          as: 'etnias',
        },
        { model: models.estados_civiles, as: 'estadocivil' },
        { model: models.niveles_de_instruccion, as: 'niveldeinstruccion' },
        { model: models.tipos_de_sangre, as: 'tipodesangre' },
      ],
    });
    if (pacient) {
      return res.status(200).json({ data: pacient });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.pacientes.update(req.body, {
      where: { paciente_id: id },
    });
    if (updated) {
      await models.pacientes.findOne({
        where: { paciente_id: id },
      });
      return res.status(200).send('Updated');
    }
    throw new Error('Not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.pacientes.destroy({
      where: { paciente_id: id },
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
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
};
