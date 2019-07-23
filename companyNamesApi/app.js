const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression')
const helmet = require('helmet');
const findCompany = require('./routes/findCompany')

app.use(helmet())
app.use(compression());
app.use(bodyParser.json())
app.use(cors())
app.use('/findCompany',findCompany)

app.listen(8081, () => console.log("listening on port 8081"))

// for testing
module.exports = app;