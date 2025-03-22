import mongoose from "mongoose";



export const connectDB= async()=>{

    try {
    const conn=    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb Connected Successfully ${conn.connection.host }`);
    } catch (error) {

        console.log("error connecting to mongodb",error.message);
        process.exit(1)
        
    }
}