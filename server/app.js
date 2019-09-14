const express = require('express');
const app = express();
const path = require('path');


// app.get('/',(req,res)=>{
//     res.send('hello')
// })
app.use(express.static(path.join('./dist/client')))

app.listen(8081,()=>console.log(8081))