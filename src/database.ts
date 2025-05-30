import mongoose  from "mongoose";

const connectDB  = async  () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI ?? "");
        console.log("MongoDB connected"); // "Conectado a MongoDB"

    } catch (error) {
        console.log("MongoDB connection error", error); // "Error de conexión a MongoDB"
        process.exit(1); // "Salir del proceso con error"
    }
}

export default connectDB; // "Exportar la función de conexión a MongoDB"