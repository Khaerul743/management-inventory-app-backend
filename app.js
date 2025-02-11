const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes') 
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
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