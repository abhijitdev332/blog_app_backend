
import mongoose from "mongoose";

class Database {
  dbUrl = process.env.DBURL;
  connect= async () => {
    await mongoose.connect(this.dbUrl);
    console.log("db conected");
  };
}

export default Database;