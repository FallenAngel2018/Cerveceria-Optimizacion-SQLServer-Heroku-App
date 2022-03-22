const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

routes.get('/', function(req, res){

    // console.log(`req.body.opcion: ${req.body.opcion}`)

    // Mejor enviar datos por Json Body, parecido a post
    const filtroCerveza = req.body || req.query || null
    // const filtroCerveza = req.query.nombre_cerveza || req.body.nombre_cerveza || null

    console.log(filtroCerveza)

    controller.obtenerCervezas(filtroCerveza)
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/', function(req, res) {
    controller.agregarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.patch('/', function(req, res) {
    controller.actualizarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.delete('/', function(req, res) {
    controller.eliminarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})


module.exports = routes