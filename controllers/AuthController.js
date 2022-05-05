const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  store(request, response) {
      const { token } = request.body;
      if (!token) throw new Error();
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(!decoded) return response.status(200).send({
        success: true,
        message: 'User is authorized.',
        decoded,
      });

      return response.status(error.status || 401).send({
        success: false,
        message: 'Not authorized.',
      })
  },
};
