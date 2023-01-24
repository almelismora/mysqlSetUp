const express = require('express')
const respuesta = require('../../red/respuesta')

const controlador = require('./controlador')

const router = express.Router()

// las rutas
router.get('/', todos)
router.get('/:id', uno)

router.delete('/', eliminar)

// las funcionalidades de las rutas
async function todos (req, res) {
    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200)
    } 
    catch (err) {
        respuesta.error(req, res, err, 500)
    }
}

async function uno (req, res) {
    try {
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200)
    } 
    catch (err) {
        respuesta.error(req, res, err, 500)
    }
    
}

async function eliminar (req, res) {
    try {
        const items = await controlador.eliminar(req.body)
        respuesta.success(req, res, 'Item eliminado satisfactoriamnente', 200)
    } 
    catch (err) {
        respuesta.error(req, res, err, 500)
    }
}

module.exports = router

