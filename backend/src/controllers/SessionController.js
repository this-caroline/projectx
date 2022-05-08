const User = require('../models').User;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user.id, email: user.email, isAdmin: user.admin },
        process.env.SECRET_KEY,
        { expiresIn: 86400000 },
      );

      return res.status(200).send({
        success: true,
        message: 'Authenticated.',
        id: user.id,
        email: user.email,
        token,
      });
    }
    
    return res.status(401).send({
      success: false,
      message: 'Invalid credentials.'
    });
  }
};
