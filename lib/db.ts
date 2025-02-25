import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
    throw new Error("Check your database connection")
}


let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
 
}

export async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10,
        }

        cached.promise = mongoose.connect(MONGODB_URI, options).then(()=>
            mongoose.connection
        )
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.log(error)
        throw new Error("Check your database connection")
    }

    return cached.conn
}
