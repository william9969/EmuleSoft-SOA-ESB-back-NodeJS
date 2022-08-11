const express = require('express');

const path = require('path')

const app = express();
const mysql = require("mysql");

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname)+'/views/index.html');
});

const PORT = process.env.PORT || 5005;
//Conexion la base de datos MySQL  
const conexion = mysql.createConnection({
    socketPath: '/cloudsql/bank3-332900:us-central1:nodejsmysql',
    host: '35.202.220.159',
    user: 'root',
    password: 'root123@',
    database: 'bancoaustro'
});

//Route
app.get('/', (req, res) => {
    res.send('Welcome Bank!');
  });

// all person
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarioBA';
  
    conexion.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Not result');
      }
    });
});

//Metodo cuenta
app.get('/search',(req,res) => {
    const cuenta = req.query.cuenta
    const sql =  `SELECT usuarioMontoBA FROM usuarioBA WHERE usuarioCuentaBA = ${cuenta}`;
    conexion.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        var valor=parseFloat(result[0].usuarioMontoBA);
        res.json({usuarioMontoBA:valor});
      } else {
        res.send('Not result');
      }
    });
  });
app.post('/add', (req,res) => {
    res.send('New account')
});
app.post('/update', (req, res) => {
    const cuenta  = req.body.cuenta;
    var monto  = req.body.monto;
    const sql1 =`SELECT usuarioMontoBA FROM usuarioBA WHERE usuarioCuentaBA = ${cuenta}`;
    conexion.query(sql1, (error, result) => {
        if (error) throw error;
    
        if (result.length > 0) {
            var valores=result[0].usuarioMontoBA;
            var nuevoValor = parseFloat(monto) +parseFloat(valores)
            //data=[{"usuarioActualizado": 1}]
            var act = 1;
            const sql = `UPDATE usuarioBA SET usuarioMontoBA='${nuevoValor}' WHERE usuarioCuentaBA =${cuenta}`;
            
            conexion.query(sql, error => {
                if (error) throw error;
                
              });
              res.json({actualizado:act});
        } else {
          res.send('Not result');
        }
      });
/*    */
});



app.post('/updateEmisor', (req, res) => {
    const cuenta  = req.body.cuenta;
    var monto  = req.body.monto;
    const sql1 =`SELECT usuarioMontoBA FROM usuarioBA WHERE usuarioCuentaBA = ${cuenta}`;
    conexion.query(sql1, (error, result) => {
        if (error) throw error;
    
        if (result.length > 0) {
            var valores=result[0].usuarioMontoBA;
            var nuevoValor = parseFloat(valores) - parseFloat(monto) 
            //data=[{"usuarioActualizado": 1}]
            const sql = `UPDATE usuarioBA SET usuarioMontoBA='${nuevoValor}' WHERE usuarioCuentaBA =${cuenta}`;
            conexion.query(sql, error => {
                if (error) throw error;
                
              });
              res.send("realizado");
        } else {
          res.send('Not result');
        }
      });
/*    */
});

app.listen(PORT, _ => {
    console.log(`Server running Port ${PORT}`);
});