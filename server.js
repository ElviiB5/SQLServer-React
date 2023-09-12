const express = require('express'),
      dbOperation = require('./dbFiles/dbOperation'),
      cors = require('cors'),
      User = require('./dbFiles/User');

const API_PORT = process.env.PORT || 5000;
const app = express();

//defining some variables for mongoDB
let client;
let session;
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.post('/api', async (req,res) => {
    console.log("Called", req.body);
    const result = await dbOperation.getUsers(req.body.username)
    res.send(result.recordset)
})
app.post('/create', async (req,res) => {
    console.log("Called", req.body);
    await dbOperation.createUser(req.body)
    const result = await dbOperation.getUsers(req.body.Username)
    res.send(result.recordset)
})

let christian = new User('christian', 'christian')
// console.log(christian);
// dbOperation.createUser(christian)

// dbOperation.getUsers().then(res => {
//     console.log(res.recordset);
// })


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));