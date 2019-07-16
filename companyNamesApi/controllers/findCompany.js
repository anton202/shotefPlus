const companyNames = require('../convertedExcel/companyNames');
const excelSheetName = Object.keys(companyNames)[0];

function byName(req, res) {
    const companeNamesSuggestion = [];
    const companyNameToSearchFor = req.params.name.trim();

    for (let i = 0; i < companyNames[excelSheetName].length; i++) {
        if (companyNames[excelSheetName][i].name === undefined) continue;
        if (companyNames[excelSheetName][i].name.includes(companyNameToSearchFor) && companeNamesSuggestion.length <= 10) {
            companeNamesSuggestion.push(companyNames[excelSheetName][i].name)
        }
    }
    companeNamesSuggestion.length === 0 ? res.status(404).end() : res.send(companeNamesSuggestion); 
}

function byNumber(req, res) {
    const companyNumber = req.params.number
    const companeNamesSuggestion = [];

    for (let i = 0; i < companyNames[excelSheetName].length; i++){
        if (companyNames[excelSheetName][i].number.toString().includes(companyNumber) && companeNamesSuggestion.length <= 10) {
            companeNamesSuggestion.push(companyNames[excelSheetName][i].name)
        }
    }
        companeNamesSuggestion.length === 0 ? res.status(404).end() : res.send(companeNamesSuggestion); 
}

exports.byName = byName;
exports.byNumber = byNumber

