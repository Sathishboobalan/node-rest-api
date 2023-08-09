const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const userRouter = require('./routes/user-router')
const placeRouter = require('./routes/places-router');
const HttpError = require('./models/http-error');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/user',userRouter)

app.use('/api/places',placeRouter)

app.use((req, res, next) => {
    next(new HttpError(`Couln't find route`,404));
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.errorCode);
    res.json({message: error.message})
})

const PORT = 5000;

app.listen(PORT,(err) => {
    if(err) {
        console.log(err);
    }else{
        console.log(`Server is up with the port number ${PORT}`);
    }
})