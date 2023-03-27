const cookieParser = require('cookie-parser');
const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('cors');

const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoHandlers');

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

// router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));
router.use(cookieParser());
router.use(auth); //authentication is required

router.get('/', getAllTodos);
router.post('/create', createTodo);
router.put('/update', updateTodo);
router.delete('/remove', deleteTodo);

module.exports = router;
