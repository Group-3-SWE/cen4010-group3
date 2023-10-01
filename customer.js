//Require module
const express = require('express');
// Express Initialize
const app = express();

const port = 3001

app.listen(port,()=> {
    console.log('listen port 3001');
})

app.get('/hello_world', (req,res)=>{
    res.send('Hello World');
})