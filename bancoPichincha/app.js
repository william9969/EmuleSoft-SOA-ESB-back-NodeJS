const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

//Crear conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'bancoPichincha',
    user: 'root',
    password: ''
});
//Route
app.get('/', (req, res) => {
    res.send('Welcome Bank!');
  });

// all person
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarioBP';
  
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
    const sql =  `SELECT usuarioMontoBP FROM usuarioBP WHERE usuarioCuentaBP = ${cuenta}`;
    conexion.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        var valor=parseFloat(result[0].usuarioMontoBP);
        res.json({usuarioMontoBP:valor});
      } else {
        res.send('Not result');
      }
    });
  });
app.post('/add', (req,res) => {
    res.send('New account')
});
app.post('/update', (req, res) => {
    const  cuenta  = req.body.cuenta;
    var  monto  = req.body.monto;
    
    const sql1 =`SELECT usuarioMontoBP FROM usuarioBP WHERE usuarioCuentaBP = ${cuenta}`;
   
    conexion.query(sql1, (error, result) => {
        if (error) throw error;
    
        if (result.length > 0) {
            var valores=result[0].usuarioMontoBP;
            var nuevoValor = parseFloat(monto) +parseFloat(valores)
            //data=[{"usuarioActualizado": 1}]
            var act = 1;
            const sql = `UPDATE usuarioBP SET usuarioMontoBP='${nuevoValor}' WHERE usuarioCuentaBP =${cuenta}`;

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
  const  cuenta  = req.body.cuenta;
  var  monto  = req.body.monto;
  
  const sql1 =`SELECT usuarioMontoBP FROM usuarioBP WHERE usuarioCuentaBP = ${cuenta}`;
 
  conexion.query(sql1, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
          var valores=result[0].usuarioMontoBP;
          var nuevoValor = parseFloat(valores) - parseFloat(monto)
          //data=[{"usuarioActualizado": 1}]
          const sql = `UPDATE usuarioBP SET usuarioMontoBP='${nuevoValor}' WHERE usuarioCuentaBP =${cuenta}`;
          
          conexion.query(sql, error => {
              if (error) throw error;
            });
            res.send('Realizado');
      } else {
        res.send('Not result');
      }
    });
/*    */
});
//Check connect 
conexion.connect(function(error){
    if(error) throw error;
    console.log('Database server running');
});

app.listen(PORT, ()=>  console.log(`Server running on port ${PORT}`));