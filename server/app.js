const express = require('express');
const app = express();
const path = require('path');



app.use(express.static(path.join('./dist/client')))

app.listen(8082,()=>console.log(8082))