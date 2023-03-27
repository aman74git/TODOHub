const axios = require('axios');
const logoutHandler = async (req, res, next) => {
  const device = req.query.device;
  axios.default.withCredentials = true;
  try {
    await axios.delete(`http://localhost:3000/auth/logout?device=${device}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${req.cookies.jwt}`,
      },
    });
    res.cookie('jwt', '', { maxAge: 0 });
    res.redirect('/login');
  } catch (err) {
    res.redirect('/home');
  }
};

module.exports = logoutHandler;
