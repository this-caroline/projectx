const { Op } = require("sequelize");
const Content = require('../models').Content;
const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = {
  async store (req, res) {
    const {
      name,
      email,
      password,
      admin
    } = req.body;
  
    const user = await User.findOne({ where: { email } });

    if(user) return res.status(400).json({
        success: false,
        message: 'Email already in use.'
    });
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const content = await User.create({
        name,
        email,
        password: hashedPassword,
        admin
      });
      if (!content) throw new Error();

      return res.status(200).json({
        success: true,
        data: {
          ...content.dataValues,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message ||
          'Internal error'
      });
    }
  },

  async index (req, res) {
    try {
      const users = await User.findAll({
        where: req.query.email
          ? { email: { [Op.like]: `${req.query.email}%` } }
          : {}
      });

      return res.status(200).json({
        success: true,
        data: users || [],
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message ||
          'Internal error.'
      });
    }
  },

  async update (req, res) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      admin
    } = req.body;

    if(email){
      const checkEmail = await User.findOne({ where: { email } });

      if (checkEmail) return res.status(400).json({
        success: false,
        message: 'Email already in use.'
    })
}

    try {
      const user = await User.findByPk(id);

      if (!user) throw new Error();

      user.name = name || user.name;
      user.email = email || user.email;
      user.admin = admin || user.admin;
      if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();
      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message ||
          'Internal error'
      });
    }
  }
};
