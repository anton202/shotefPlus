const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join('../client/dist')));


app.listen(8082,()=>console.log(8082))