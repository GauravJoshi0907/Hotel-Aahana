const mysql = require("mysql2");
const dotenv =require('dotenv');
dotenv.config();

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "1234",
    database:  "hotelwebapp",
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("Database Connected Successfully");
    }
    else
    {
        console.log("Connection Failed \n Error :  " + JSON.stringify(err, undefined, 2));
    }
})


module.exports = mysqlConnection;