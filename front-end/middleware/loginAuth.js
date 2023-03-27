const axios = require('axios');
const loginAuth = async (req, res, next) => {
  axios.default.withCredentials = true;
  try {
    await axios.get('http://localhost:3000/auth', {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${req.cookies.jwt}`,
      },
    });
    res.redirect('/home');
  } catch (err) {
    next();
  }
};

module.exports = loginAuth;
