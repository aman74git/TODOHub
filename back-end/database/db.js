require('dotenv').config();
const db = require('mongoose');

db.set('strictQuery', true);

//connect to db
const connectDB = async () => {
  // await db.connect('mongodb://localhost:27017/todoDB', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  await db.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.be8wbb1.mongodb.net/todoDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('DB connected successfully');
};

connectDB().catch((err) => console.log(err));

module.exports = db;
