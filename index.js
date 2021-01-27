const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql');
 
// File path.
readXlsxFile('item.xlsx').then((rows) => {
 
  console.log(rows);
  
 
 
  rows.shift();
 
  // Create a connection to the database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: '3307'
  });
 
  
  connection.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      let query = 'INSERT INTO item (id, name, description, quantity, amount) VALUES ?';
      connection.query(query, [rows], (error, response) => {
        console.log(error || response);
        
      });
    }
  });
})