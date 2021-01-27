var express = require('express');
var router = express.Router();
const excel = require("exceljs");
const readXlsxFile = require('read-excel-file/node');
var item = require('../models/item');
var connection = require('../dbconnection');
router.get('/', function (req, res, next) {


  item.getAllitem(function (err, customers, fields) {
    const jsonCustomers = JSON.parse(JSON.stringify(customers));
    console.log(jsonCustomers);


    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet("Customers"); //creating worksheet

    //  WorkSheet Header
    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Description", key: "description", width: 30 },
      { header: "Quantity", key: "quantity", width: 10, outlineLevel: 1 },
      { header: "Amount", key: "amount", width: 30 },
    ];

    // Add Array Rows
    worksheet.addRows(jsonCustomers);

    // Write to File
    workbook.xlsx.writeFile("item1.xlsx").then(function () {
      console.log("file saved!");
      res.send("Runnning successsfully");
    });
  }
  );
});

router.get('/import', function (req, res, next) {
  readXlsxFile('item.xlsx').then((rows) => {

    console.log(rows);
    rows.shift();
    let query = 'INSERT INTO item (id, name, description, quantity, amount) VALUES ?';
    connection.query(query, [rows], (error, response) => {
      console.log(error || response);
      if (error) {
        res.send("Not Successfull");
      }
      else {
        res.send("Running successfully");
      }
    });

  });


});
module.exports = {
  routes: router
}