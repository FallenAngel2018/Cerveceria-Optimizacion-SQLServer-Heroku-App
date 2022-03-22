const pool = require('../../bd')
const sql = require('mssql');

async function obtenerCervezas( filtroCerveza ) {

    // Stored procedure
    const conn = await pool.getConnection();


    const objeto = conn.request()
        .input('opcion', sql.Int, filtroCerveza.opcion)
        .execute('SP_Cervezas_ConsultarPorFiltros')
    .then(result => {
        // console.log(result);
        // console.dir(result.recordsets[1]);
        return result.recordsets[1];
    }).catch(err => {
        // ... error checks
        console.dir(err);
        console.log(err);
    })


    // console.log(objeto);

    return objeto;


    // Select puro

    // // Sql Server (mssql)
    // const conn = await pool.getConnection();
    // var queryStr = "";
    // let results = null;

    // console.log(`filtroCerveza: ${filtroCerveza}`)

    // if (filtroCerveza) {
    //     // results = await pool.query('SELECT * FROM producto WHERE nombre LIKE $1', [ '%' + filtroCerveza + '%' ])
        
    //     queryStr = `SELECT * FROM Cervezas WHERE nombre LIKE '%' + '${filtroCerveza}' + '%'`;
        
    //     results = await conn.request().query(queryStr);
    // } else {
    //     // const result = await conn.request().query("");
    //     queryStr = "SELECT * FROM Cervezas";
        
    //     results = await conn.request().query(queryStr);
    // }

    // // console.log(results.recordset);

    // return results.recordset;

}

async function agregarProducto( producto ) {
    // let resultado = await pool.query('INSERT INTO producto(id_producto, nombre, valor) VALUES($1, $2, $3)',
    //     [producto.id, producto.nombre, producto.valor])
    
    // console.log(resultado)
    // return producto

    // // // Sql Server (mssql)
    // // Stored procedure
    // const conn = await pool.getConnection();
    // const result = await conn.request().query("SELECT * FROM Producto");

    // console.log((result.recordset));

    // return result.recordset;

    const conn = await pool.getConnection();

    const results = null;
    const transaction = new sql.Transaction(conn)
    transaction.begin(err => {
        // ... error checks
        
        // 'insert into mytable (mycolumn) values (12345)'
        // var queryStr = 'insert into producto (id_producto, nombre, valor) values (@id, @nombre, @valor)'
        var queryStr = `insert into producto (id_producto, nombre, valor)
                        values (${producto.id}, '${producto.nombre}', ${producto.valor})`

        const request = new sql.Request(transaction)
        request.query(queryStr, (err, result) => {
            // ... error checks

            console.dir(result)
            console.log(err)

            results = result

            transaction.commit(err => {
                // ... error checks

                console.log("Transaction committed.")
            })
        })
    })


    return results

}

async function actualizarProducto( producto ) {
    // let resultado = await pool.query('UPDATE producto SET nombre=$1, valor=$3 WHERE id_producto = $2',
    //     [producto.nombre, producto.id, producto.valor])

    // console.log(resultado)
    
    // return resultado // producto

    const conn = await pool.getConnection();

    const results = null;
    const transaction = new sql.Transaction(conn)
    transaction.begin(err => {
        // ... error checks
        
        var queryStr = `UPDATE producto SET nombre='${producto.nombre}', valor=${producto.valor}
                            WHERE id_producto = ${producto.id}`


        const request = new sql.Request(transaction)
        request.query(queryStr, (err, result) => {
            // ... error checks

            console.dir(result)
            console.log(err)

            transaction.commit(err => {
                // ... error checks

                console.log("Transaction committed.")
            })

            conn.close();

            return result;

        })

    })

    return results

}

async function eliminarProducto( producto ) {
    // let resultado = await pool.query('DELETE FROM producto WHERE id_producto = $1', [producto.id])
    // return producto

    const conn = await pool.getConnection();

    const transaction = new sql.Transaction(conn)
    transaction.begin(err => {
        // ... error checks
        
        var queryStr = `DELETE FROM producto WHERE id_producto = ${producto.id}`;

        const request = new sql.Request(transaction)
        request.query(queryStr, (err, result) => {
            // ... error checks

            console.dir(result)
            console.log(err)

            transaction.commit(err => {
                // ... error checks

                console.log("Transaction committed.")
            })

            conn.close();

            return result;

        })

    })

}

module.exports = {
    obtener: obtenerCervezas, 
    agregar: agregarProducto,
    actualizar: actualizarProducto,
    eliminar: eliminarProducto,
}