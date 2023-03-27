require('dotenv').config();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: 'email and password required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ msg: 'Invalid email or password' });

    //handle token
    const acessToken = jwt.sign(
      { user_id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );

    //creating refresh token
    const refreshToken = jwt.sign(
      { user_id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '15d' }
    );

    //add refresh token to db
    user.refreshTokens.push(refreshToken);
    await user.save();

    //refresh token as cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    //acess token as json response
    res.status(200).json({ acessToken });
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = loginHandler;
