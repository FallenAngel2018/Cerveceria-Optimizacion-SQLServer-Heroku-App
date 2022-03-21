// const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'tiendita',
//     password: 'inexcelsisdeo',
//     port: 5432,
// })

// module.exports = pool


const sql = require('mssql')

const dbSettings = {
    user: "fallenage_CerveceriaOptimizacion", // root
    password: "Sqlserverpassword2022", //"Sqlserverpassword2021",
    // server: "DESKTOP-STTIOAH\SQLEXPRESS",
    server: "sql.bsite.net\\MSSQL2016", //"localhost",
    database: "fallenage_CerveceriaOptimizacion",
    port: 1433,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self signed certs
    }
};

// module.exports = pool

module.exports.getConnection = async function(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}