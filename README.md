# TaskMate


#### install node_modules

1. goto `front-end` folder
2. open terminal in that folder
3. enter command `npm install`
4. goto `back-end` folder
5. open terminal in that folder
6. enter command `npm install`

#### Update your .env file

1. goto `back-end` folder
2. create a file named `.env`
3. write the following inside the file replace the angular brackets by the appropriate values
```
PORT = 3000
DB_USER_NAME=<Your MongoDB username>
DB_PASSWORD=<Your MongoDB password>
ACCESS_TOKEN_SECRET=<A random string of atleast 32 characters>
REFRESH_TOKEN_SECRET=<A random string of atleast 32 characters>
```

#### Database connection

In the `back-end` folder inside `database/db.js`

##### If you want to use local database your connection configuration should look like
```
const URI_local = 'mongodb://localhost:27017/todoDB';

const connectDB = async () => {
  await db.connect(
    URI_local,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('DB connected successfully');
};
```
also remove below lines from .env file
```
DB_USER_NAME=<Your MongoDB username>
DB_PASSWORD=<Your MongoDB password>
```

##### If you want to connect to mongoDB atlas your configuration should look like
```
const URI_cloud = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.be8wbb1.mongodb.net/todoDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  await db.connect(
    URI_cloud,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('DB connected successfully');
};
```
you need not to remove any lines from .env file

#### Running the website on the localhost

1. goto `front-end` folder, launch the terminal in that folder
2. enter command `npm run front-end`
3. keep the terminal open, goto `back-end` folder, launch the terminal in that folder
4. enter command `npm run back-end`

Now, Website will be live on ` https://localhost:4500/ ` or at different port if changed by user
