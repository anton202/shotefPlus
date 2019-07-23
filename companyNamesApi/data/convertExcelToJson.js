const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

jsObj = excelToJson({
    sourceFile: './data/companyNames.xlsx',
    columnToKey: {
        A: 'number',
        B: 'name'
    }
})

fs.writeFile('./data/companyNames.json',JSON.stringify(jsObj),(err)=>{
    if(err) console.log(err)
})

