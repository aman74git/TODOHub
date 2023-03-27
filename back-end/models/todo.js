const db = require('../database/db');

const TodoSchema = new db.Schema({
  description: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

TodoSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

const Todo = db.model('Todo', TodoSchema);
module.exports = Todo;
