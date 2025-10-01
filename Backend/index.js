import express from "express"
import { configDotenv } from "dotenv";
import { connectDb } from "./config/MongoDb.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";
const app=express();

const port=process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)


app.listen(port,()=>{
    console.log(`server is listening on port Number ${port}`)
    connectDb()
})
