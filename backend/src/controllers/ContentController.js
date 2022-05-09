const Content = require('../models').Content;
const User = require('../models').User;

module.exports = {
  async store (req, res) {
    const { filename, mimeType } = req.body;
    const userId = req.userId
    try {
      const content = await Content.create({ filename, mimeType, userId });

      if (!content) throw new Error();

      return res.status(200).json({
        success: true,
        data: content.dataValues,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message ||
          'Internal error'
      });
    }
  },

  async update (req, res) {
    const { id } = req.params;
    const { filename, mimeType } = req.body;

    try {
      const content = await Content.findByPk(id, {
        include: { model: User, required: true, attributes: ['email'] },
      });

      if (!content) throw new Error();

      content.filename = filename;
      content.mimeType = mimeType;
      content.UserId =  req.userId;

      await content.save();

      return res.status(200).json({
        success: true,
        data: content.dataValues,
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
      if(req.isAdmin) {
        const allContent = await Content.findAll()
        return res.status(200).json({
          success: true,
          data: allContent || [],
        }) 
      };

      const content = await Content.findAll({
        where: {
          userId: req.userId
        }
      });

      return res.status(200).json({
        success: true,
        data: content || [],
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message ||
          'Internal error'
      });
    }
  },
};
