const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const loginHandler = require('../controllers/loginHandler');
const logoutHandler = require('../controllers/logoutHandler');
const registrationHandler = require('../controllers/registrationHandler');
const authHandler = require('../controllers/authHandler');

const router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4500');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.use(
  cors({  
    origin: 'http://localhost:4500',
    credentials: true,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));
router.use(cookieParser());

router.get('/', auth, authHandler);
router.post('/login', loginHandler);
router.post('/register', registrationHandler);
router.delete('/logout', auth, logoutHandler);

module.exports = router;
