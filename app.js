const express = require('express')
const app = express();
const helmet = require('helmet');
const cors = require('cors');


app.get('/', (req, res)=> res.json({message: 'Bienvenido a tu biblioteca'}))

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(3001, ()=>{
    console.log('Escuchando en el puerto 3001');
})