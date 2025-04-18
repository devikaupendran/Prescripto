import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}
// mongoose.connect(process.env.MONGO).then(() => {
//     console.log('connected to mongoDB')

// }).catch((err) => {
//     console.log(err)
// })
export default connectDB;