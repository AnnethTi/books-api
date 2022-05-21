const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const permission = require('../middlewares/permission');

//CRUD
//get
router.get('/', permission('admin', 'client'),async(req, res)=>{
    const books = await sequelize.models.books.findAndCountAll()
    return res.status(200).json( {data: books})
})

//create
router.post('/',permission('client','admin'),async(req, res)=>{
    const {body} = req;
    const book = await sequelize.models.books.create({
        title: body.title,
        author: body.author,
        image: body.image,
        description: body.description,
        status: body.status,
    })
    await book.save()
    return res.status(201).json({data: book})
})

//update
router.put('/:id', permission('admin', 'client'),async(req, res)=>{
    const {body, params: {id}} = req;
    const book = await sequelize.models.books.findByPk(id)
    if (!book){
        return res.status(404).json({code:404,  message: 'Book not found'})
    }

    const updateBook = await book.update({
        title: body.title,
        author: body.author,
        image: body.image,
        description: body.description,
        status: body.status,
    })

    return res.json({data:updateBook})
})

//delete
router.delete('/:id',permission('admin', 'client'), async(req, res)=>{
    const {params: {id}} = req;
    const book = await sequelize.models.books.findByPk(id)
    if (!book){
        return res.status(404).json({code:404,  message: 'Book not found'})
    }
    await book.destroy()
    return req.json()
})


module.exports = router;