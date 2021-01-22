var express = require('express');
var router = express.Router();
const excel = require("exceljs");
var item=require('../models/item');
router.get('/',function(req,res,next){
    item.getAllitem(function (err, customers, fields)
    {
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
    workbook.xlsx.writeFile("item.xlsx").then(function () {
      console.log("file saved!");
      res.send("Runnning successsfully");
    });
    }
    );
});
module.exports = {
    routes: router
}