const axios = require('axios');
const homeAuth = async (req, res, next) => {
  axios.default.withCredentials = true;
  try {
    await axios.get('http://localhost:3000/auth', {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${req.cookies.jwt}`,
      },
    });
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

module.exports = homeAuth;
