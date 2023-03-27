const db = require('../database/db');

const userSchema = new db.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  refreshTokens: [String],
  todos: [
    {
      type: db.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

const User = db.model('User', userSchema);
module.exports = User;
