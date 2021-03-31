import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
dotenv.config();

import './database/Connection';
import createRoutes from './router/Index';
import path from "path";

const app = express();
const http = createServer(app);

createRoutes(app);
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));
const __filename = fileURLToPath(import.meta.url); //Bu hozir turgan fayl joyini topadi
const __dirname = path.dirname(__filename); //va shuni bu yerda path ko'rinishga olib keladi, ya'ni stringdan
// console.log(__dirname);
app.use(express.static(__dirname + './../public')); //natijada src/ ichini ko'radi, public esa bitta orqadagi faylda shunday ekan ./../public bo'ladi. Va publicda static fayllar yoadi, agar sass ishlatsang src/ichida assets digan popka ochasan va shuyodan ishlatvurasan

// set view engine
app.set('views', './src/views'); //Bu EJS uchun  view engine
app.set('view engine', 'ejs');

// console.log(path.join(__dirname,'public'))
const PORT = process.env.PORT || 3003;
http.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT} , ${process.env.PORT}`);
});