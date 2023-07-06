const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 

const port = 8000;

var app = express();
app.use(bodyParser.json());
app.use(cors());


//Get All Users 
app.get("/users", (req, res)=>{
    mysqlConnection.query("SELECT * from users", (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
          else{
            console.log(err);
        }
    })
});

// //Get Specific User Details Through his userId
// app.get("/users/:userId", (req, res)=>{
//     mysqlConnection.query("SELECT * from users WHERE userId = ?",[req.params.userId],(err, rows, fields)=>{
//         if(!err)
//         {
//             res.send(rows);
//         }
//           else{
//             console.log(err);
//         }
//     })
// });

//Delete User Details Through his userId
app.delete("/users/:userId", (req, res)=>{
    mysqlConnection.query("DELETE FROM users WHERE userId = ?",[req.params.userId],(err, rows, fields)=>{
        if(!err)
        {
            res.send("User details deleted successfully from the database");
        }
          else{
            console.log(err);
        }
    })
});

//Insert User Details
app.post("/users", (req, res)=>{
    let user = req.body;
    mysqlConnection.query("INSERT INTO users(userName,contact,address,roomNo) values(?,?,?,?)", [user.userName, user.contact, user.address,user.roomNo],(err, rows, fields)=>{
        if(!err)
        {
            res.send({data: rows, message:"Data inserted successfully "}).status(200);
        }
          else{
            console.log(err);
        }
    })
});

//Get All Unbooked Rooms
app.get("/rooms", (req, res)=>{
    mysqlConnection.query("SELECT * from hotelrooms Where isBooked='false'", (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
          else{
            console.log(err);
        }
    })
});

//change isBooked value to true 
app.put("/rooms/:userRoom", (req, res)=>{
    
    mysqlConnection.query(`UPDATE hotelrooms SET isBooked = true WHERE roomNo = ${req.params.userRoom}`,(err, rows, fields)=>{
        if(!err)
        {
            res.send({data: rows, message:"Data Updated Successfully "}).status(200);
        }
          else{
            console.log(err);
        }
    })
});

//Update User Details
app.put("/users", (req, res)=>{
    let user = req.body;
    mysqlConnection.query("UPDATE users SET ? WHERE userId="+user.userId,[user],(err, rows, fields)=>{
        if(!err)
        {
            res.send({data: rows, message:"Data Updated Successfully "}).status(200);
        }
          else{
            console.log(err);
        }
    })
});

//validate user 
app.get("/users/:contactNo", (req, res)=>{
    
    mysqlConnection.query(`SELECT * FROM users WHERE contact = ${req.params.contactNo}`,(err, rows, fields)=>{
        if(!err)
        {
            length = Object.keys(rows).length

             if(length>=1)
             {  res.send({ message:"Data Matched Successfully"}).status(200);}
             else{
                res.send({ message:"Data Doesn't Matches"}).status(200);  
             }
        }
          else{
            console.log(err);
        }
    })
});



app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})