import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from './router/web'
import connectDB from './config/connectDB'
import cors from 'cors'

require('dotenv').config()


let app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}))

//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app)
connectDB()

let port = process.env.PORT || 6969
app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
})

