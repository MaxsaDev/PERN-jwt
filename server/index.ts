//npm init -y
//npm i --save-dev @types/node
//npm i -g ts-node
//npm i typescript
//npm i express @types/express
//npm i cors cookie-parser
//npm i nodemon --save-dev
//npm i dotenv
//npm i cross-env
//npm install --save pg pg-hstore
//tsc --init

//npm i jwt bcryptjs

//npm i class-validator
//
//




//require('dotenv').config();
// const config = require('dotenv').config({
//     path: `process.env.${process.env.NODE_ENV}`
// }).parsed

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// app.get('/', (req:string, res:<HttpStatus>)=> {
//    res.status(200).json({message: 'MESSAGE'})
// })

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e);
    }
}

start();