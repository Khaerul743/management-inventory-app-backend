const express = require('express');
const cors = require('cors')
const {rateLimit} = require('express-rate-limit');
// const helmet = require('helmet')
const app = express();
const productRoutes = require('./routes/productRoutes') 
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const morgan = require("morgan")

app.set('trust proxy', 1)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message:"Terlalu banyak request, coba lagi nanti!",
    headers:true,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
// app.use(limiter)
app.use(
  cors({
    origin: 'https://6vfkw0gd-5500.asse.devtunnels.ms', // Sesuaikan dengan FE
    credentials: true, // Wajib biar cookie bisa dikirim
  })
);
app.use(morgan("dev"));
// app.use(helmet())
app.use('/product',productRoutes);
app.use('/auth',authRoutes)
app.use('/order',orderRoutes)
app.use('/user',userRoutes)

app.post('/',(req,res) => {
    res.send(req.body);
})

app.listen(process.env.PORT,'0.0.0.0',() => {
    console.log("server is running on port http://localhost:"+process.env.PORT)
})