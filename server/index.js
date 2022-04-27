//npm init -y
//npm i express
//npm i cors cookie-parser
//npm i nodemon --save-dev
//npm i dotenv cross-env
//npm install --save pg pg-hstore
//npm i jsonwebtoken bcrypt uuid
//npm i jsonwebtoken bcryptjs uuid
//npm i nodemailer
//npm i express-validator


//npm i jwt bcryptjs

//npm i class-validator
//
//
//npm i --save-dev @types/node
//npm i -g ts-node
//npm i typescript
//npm i express @types/express
// tsc --init




//require('dotenv').config();
// const config = require('dotenv').config({
//     path: `process.env.${process.env.NODE_ENV}`
// }).parsed

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);


app.use(errorHandler);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }catch(e){
        console.log(e);
    }
}

start();