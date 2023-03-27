const User = require('../models/users');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    //here authorizing using refresh token, later change it to authorize with acess token
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken)
      return res.status(401).json({ msg: 'auth token required' });
    //verify token
    const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(verified.user_id);
    if (!user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ msg: 'auth token invalid' });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: `${error.message}` });
  }
};

module.exports = auth;
