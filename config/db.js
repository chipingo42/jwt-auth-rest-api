const mongoose = require('mongoose')


const connecteDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      // dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB connected. ${conn.connection.host}`);
  } catch (error) {
    console.log({error: error.message});
    process.exit(1)
  }
};

mongoose.connection.on('disconnected', () => {
  console.log(" Mongoose connection is disconnected...");
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

module.exports = connecteDB;

