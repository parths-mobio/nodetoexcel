const mysql = require("mysql");

const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

const itemRoutes = require('./routes/routes');


app.use(express.json());
app.use(cors());
app.use('/api', itemRoutes.routes);

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/`);
});

