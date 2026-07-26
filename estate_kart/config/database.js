import dns from "node:dns/promises";   
import mongoose from 'mongoose';
let connected = false;
/* works when I add this */
dns.setServers(["1.1.1.1", "1.0.0.1"]);   
const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if db is already conected , dont connect again

  if (connected) {
    console.log("Mongodb is Already connected...");
    return;
  }


  //connect to mongoDB
  try {
    // console.log('process.env.MONGODB_URI : ',process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
