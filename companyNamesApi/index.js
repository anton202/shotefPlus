const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const findCompany = require('./routes/findCompany')

app.use(bodyParser.json())
app.use(cors())
app.use('/findCompany',findCompany)

app.listen(8081, () => console.log("listening on port 8081"))

// for testing
module.exports = app;