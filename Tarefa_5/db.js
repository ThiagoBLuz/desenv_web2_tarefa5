// db.js
const mysql = require('mysql2');

// Configuração de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '1234',  
  database: 'ecommerce_db'  
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
