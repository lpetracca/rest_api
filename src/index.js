const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('../routes/index');

app.set('port', 3000); //define port

app.use(express.urlencoded({extended: false}));
app.use(express.json()); //allow .json reception

app.use(morgan('dev')); //for npm run dev

app.use(router);

app.listen(app.get('port'), () =>{
    console.log(`Server listen on port ${app.get('port')}`);
});