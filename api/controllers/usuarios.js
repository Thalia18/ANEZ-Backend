const models = require('../models');
const pagination = require('../utils/pagination');
const mail = require('../nodemailer/creacion_usuario');

const createUsuario = async (req, res) => {
  try {
    const usuario = await models.usuarios.findOne({
      where: { cedula: req.body.cedula },
    });
    if (usuario !== null) {
      return res.status(200).json({
        info: {
          exist: true,
        },
      });
    } else {
      const user = await models.usuarios.create(req.body);
      mail(req.body.email, req.body.contrasena, req.body.usuario);
      return res.status(201).json({
        info: {
          usuario_id: user.usuario_id,
          exist: false,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await models.usuarios.findAll({
      order: [
        ['apellido', 'ASC'],
        ['nombre', 'ASC'],
      ],
    });
    let data = pagination(req.query.page, usuarios);
    return res.status(200).json({
      info: data.paginate,
      data: data.result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await models.usuarios.findOne({
      where: { usuario_id: id },
      attributes: [
        'usuario_id',
        'usuario',
        'nombre',
        'apellido',
        'cedula',
        'email',
        'fecha_nacimiento',
        'telefono',
        'consultorio_id',
        'rol_id',
      ],
      include: [
        { model: models.roles, as: 'rol', attributes: ['rol'] },
        {
          model: models.consultorios,
          as: 'consultorios',
          attributes: ['nombre'],
        },
      ],
    });
    if (usuario) {
      return res.status(200).json({ data: usuario });
    }
    return res.status(404).send('The specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await models.usuarios.findOne({
      where: { cedula: req.body.cedula },
    });
    const { id } = req.params;
    const {
      nombre,
      apellido,
      cedula,
      email,
      fecha_nacimiento,
      telefono,
      consultorio_id,
      rol_id,
      updated_at,
    } = req.body;
    if (usuario) {
      if (usuario.usuario_id.toString() === id) {
        const [updated] = await models.usuarios.update(
          {
            nombre,
            apellido,
            cedula,
            email,
            fecha_nacimiento,
            telefono,
            consultorio_id,
            rol_id,
            updated_at,
          },
          {
            where: { usuario_id: id },
          }
        );

        if (updated) {
          await models.usuarios.findOne({
            where: { usuario_id: id },
          });
          return res.status(200).json({
            data: {
              exist: false,
            },
          });
        } else throw new Error('Not found');
      } else {
        return res.status(200).json({
          data: {
            exist: true,
          },
        });
      }
    } else {
      const [updated] = await models.usuarios.update(
        {
          nombre,
          apellido,
          cedula,
          email,
          fecha_nacimiento,
          telefono,
          consultorio_id,
          rol_id,
          updated_at,
        },
        {
          where: { usuario_id: id },
        }
      );

      if (updated) {
        await models.usuarios.findOne({
          where: { usuario_id: id },
        });
        return res.status(200).json({
          data: {
            exist: false,
          },
        });
      } else throw new Error('Not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.usuarios.destroy({
      where: { usuario_id: id },
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
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
