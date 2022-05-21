const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res)=>{
    const {body} = req;
    const user = await sequelize.models.users.findOne({
        where:{
            email: body.email //revisar si el usuario existe con el email
        }
    })
    if(!user){
        return res.status(401).json({message: 'Unauthorized'})
    }

    if(!user.validPassword(body.password)){
        return res.status(401).json({message: 'Invalid credentials'}) //validacion de password
    }

    const token = jwt.sign({userId: user.id}, 'secretkey', { //si todo bien, da permiso de entrar
        expiresIn: 36000,
    })
    return res.json({
        message: 'Authenticated sucessfully',  //nos da el token
        token,
    })
})


router.post('/signup', async(req, res)=>{ //registro
    const {body} = req;

    let user = await sequelize.models.users.findOne({ //validar si el usuario existe
        where:{
            email: body.email //revisar si el usuario existe con el email
        }
    })
    if(user){
        return res.status(400).json({message: 'Ya esta registrado'}) //en caso de existir, notificar
    }

    user = await sequelize.models.users.create({ //crear el usuario
        name : body.name,
        lastname : body.lastname,
        email : body.email,
        password : body.password,
        type : 'client', //damos de manera predeterminada que el usuario es clien
    })
    await user.save() 
    return res.json({ message: 'Cuenta creada'});

    
})

module.exports = router;