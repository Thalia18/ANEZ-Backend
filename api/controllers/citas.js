const models = require('../models');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Sequelize.Op;

const createCita = async (req, res) => {
  try {
    const cita_med = await models.citas.findOne({
      where: {
        fecha: req.body.fecha,
        hora: req.body.hora,
        medico_id: req.body.medico_id,
      },
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido'],
          as: 'pacientes',
        },
        {
          model: models.medicos,
          as: 'medicos',
        },
      ],
    });
    const cita_pac = await models.citas.findOne({
      where: {
        paciente_id: req.body.paciente_id,
        fecha: req.body.fecha,
        hora: req.body.hora,
        // medico_id: req.body.medico_id,
      },
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido'],
          as: 'pacientes',
        },
        {
          model: models.medicos,
          as: 'medicos',
        },
      ],
    });
    if (cita_med || cita_pac) {
      return res.status(200).json({ data: cita_pac || cita_med });
    } else {
      await models.citas.create(req.body);
      return res.status(201).send('Created');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getAllCitas = async (req, res) => {
  try {
    const citas = await models.citas.findAll({
      where: { fecha: { [Op.between]: [fecha1, fecha2] } },
      order: [
        ['fecha', 'ASC'],
        ['hora', 'ASC'],
      ],
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'cedula'],
          as: 'pacientes',
        },
      ],
    });
    return res.status(200).json({
      data: citas,
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
  const { id } = req.params;
  try {
    const cita_pac = await models.citas.findOne({
      where: {
        paciente_id: req.body.paciente_id,
        fecha: req.body.fecha,
        hora: req.body.hora,
      },
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'paciente_id'],
          as: 'pacientes',
        },
        {
          model: models.medicos,
          as: 'medicos',
        },
      ],
    });
    const cita_med = await models.citas.findOne({
      where: {
        fecha: req.body.fecha,
        hora: req.body.hora,
        medico_id: req.body.medico_id,
      },
      include: [
        {
          model: models.pacientes,
          attributes: ['nombre', 'apellido', 'paciente_id'],
          as: 'pacientes',
        },
        {
          model: models.medicos,
          as: 'medicos',
        },
      ],
    });
    console.log(cita_pac ? true : false);
    console.log(cita_med ? true : false);
    if (cita_pac && !cita_med) {
      if (cita_pac.paciente_id.toString() !== req.body.paciente_id.toString()) {
        return res.status(200).json({ data: cita_pac });
      } else {
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
      }
    } else if (!cita_pac && !cita_med) {
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
    } else if (!cita_pac && cita_med) {
      return res.status(200).json({ data: cita_med });
    } else {
      return res.status(200).json({ data: cita_pac });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
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
