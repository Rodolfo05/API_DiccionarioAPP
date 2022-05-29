const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

//Instancia de express
const app = express();

app.use(bodyParser.json());

//MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_diccionarioApp'
});

//Check conexion
connection.connect(error => {
    if(error){
        throw error;
    }else{
        console.log('BD corriendo...');
    }
})

//RUTAS
app.get('/', (req, res) => {
    res.send('Bienvenido API Diccionario');
});

//GET TODOS LOS REGISTROS
app.get('/conceptos', (req, res) => {

    const sql = 'SELECT * FROM CONCEPTOS';

    connection.query(sql, (error, resultado) => {
        if(error) throw error;

        //todo correcto
        if(resultado.length > 0){
            res.json(resultado);
        }else{
            res.send('No se encontraron registros');
        }
    })

})

app.get('/conceptos/:id', (req, res) => {

    const {id} = req.params;

    const sql = `SELECT * FROM CONCEPTOS WHERE ID_CONCEPTO = ${id}`;

    connection.query(sql, (error, resultado) => {
        if(error) throw error;

        //todo correcto
        if(resultado.length > 0){
            res.json(resultado);
        }else{
            res.send('No se encontraron registros');
        }
    })
})

app.post('/conceptos', (req, res) => {

    const sql = `INSERT INTO CONCEPTOS SET ?`;

    const conceptoObj = {
        concepto: req.body.concepto,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }

    connection.query(sql, conceptoObj, error => {
        
        if(error) throw error;
        res.send('Concepto Creado.');
    })
})

app.put('/conceptos/:id', (req, res) => {

    const {id} = req.params;
    const {concepto, descripcion, estado} = req.body;

    const sql = `UPDATE CONCEPTOS SET concepto = '${concepto}', descripcion = '${descripcion}', estado = '${estado}' where ID_CONCEPTO = ${id}`;

    connection.query(sql, error => {
        
        if(error) throw error;
        res.send('Concepto Modificado.');
    })
})

app.delete('/conceptos/:id', (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM CONCEPTOS WHERE ID_CONCEPTO = ${id}`;

    connection.query(sql, error => {
        
        if(error) throw error;
        res.send('Concepto Eliminado.');
    })
})

app.listen(PORT, () => {console.log(`Server corriendo en el puerto ${PORT}`)})