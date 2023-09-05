import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection ;
        connection.on('connected',()=>{
            console.log('Connected to MongoDB');
        })

        connection.on('error',(err)=>{
                    console.log('mongodb connection error. please make sure mongoDB is running'+err);
                    process.exit();
                })

    } catch (error) {
        console.log("something goes wrong!");
        console.log(error);
    }
}