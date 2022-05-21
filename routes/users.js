const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const permission = require('../middlewares/permission');
//CRUD
//get
router.get('/', permission('admin', 'client'),async(req, res)=>{
    const users = await sequelize.models.users.findAndCountAll()
    return res.status(200).json( {data: users})
})

//create
router.post('/',permission('admin', 'client'),async(req, res)=>{
    const {body} = req;
    const user = await sequelize.models.users.create({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password : body.password,
        type: body.type,
    })
    await user.save()
    return res.status(201).json({data: user})
})

//update
router.put('/:id', permission('admin', 'client'), async(req, res)=>{
    const {body, params: {id}} = req;
    const user = await sequelize.models.users.findByPk(id)
    if (!user){
        return res.status(404).json({code:404,  message: 'User not found'})
    }

    const updateUser = await user.update({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password : body.password,
        type: body.type,
    })

    return res.json({data:updateUser})
})

//delete
router.delete('/:id', permission('admin', 'client'),async(req, res)=>{
    const {params: {id}} = req;
    const user = await sequelize.models.users.findByPk(id)
    if (!user){
        return res.status(404).json({code:404,  message: 'User not found'})
    }
    await user.destroy()
    return req.json()
})


module.exports = router;