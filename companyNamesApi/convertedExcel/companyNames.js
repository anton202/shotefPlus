const excelToJson = require('convert-excel-to-json');
module.exports = excelToJson({
    sourceFile: './data/companyNames.xlsx',
    columnToKey: {
        A: 'number',
        B: 'name'
    }
})