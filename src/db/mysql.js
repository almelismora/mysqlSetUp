const mysql = require('mysql')

const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion

function conmysql(){
    conexion = mysql.createConnection(dbconfig)

    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err)
            setTimeout(conmysql, 200)
        } else {
            console.log('DB conectada!!')
        }
    })

    conexion.on('error', err => {
        console.log('[db err]', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            conmysql()
        } else {
            throw err
        }
    })
}

conmysql()


function todos(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function uno(tabla, id){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function agregar(tabla, data){

}

function eliminar(tabla, data){
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE * FROM ${tabla} WHERE id = ?`, data.id,  (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}


module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}