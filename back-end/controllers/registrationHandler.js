const bcrypt = require('bcrypt');
const User = require('../models/users');

const registrationHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: 'email and password required' });
    const duplicate = await User.findOne({ email });
    if (duplicate) return res.status(409).json({ msg: 'User already exist' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = registrationHandler;
