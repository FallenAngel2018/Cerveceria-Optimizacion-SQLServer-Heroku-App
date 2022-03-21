const pais = require('../components/pais/network')
const producto = require('../components/producto/network')
const cerveza = require('../components/cerveza/network')

const routes = function( server ) {
    server.use('/pais', pais)
    server.use('/producto', producto)
    server.use('/cerveza', cerveza)
}

module.exports = routes