const logoutHandler = async (req, res) => {
  try {
    const user = req.user;
    const refreshToken = req.cookies.jwt;

    if (req.query.device === 'current') {
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refreshToken
      );
    } else if (req.query.device === 'all') {
      user.refreshTokens = [];
    } else if (req.query.device) {
      return res.status(400).json({ msg: 'invalid logout type' });
    } else {
      return res.status(400).json({ msg: "can't get logout type" });
    }

    user.save();
    //clear jwt cookie
    res.clearCookie('jwt');
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = logoutHandler;
