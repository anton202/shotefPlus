import { browser, by, element } from 'protractor';
import { data } from '../../src/app/user-area/data';

export interface Report {
    shotefPlus?: number;
    delay?: number;
    comment?: string;
}

describe('user area', () => {
    let userArea;

    beforeEach(() => {
        browser.get('http://localhost:4200/')
    })

    beforeEach(() => {
        let userButton = element(by.id('user'))
        userButton.click()

        userArea = element(by.className('userAreaContainer'))
    })

    it('should open user area', () => {
        expect(userArea.isPresent()).toBe(true)
    })

    it('should display heading my reports', () => {
        let heading = userArea.element(by.tagName('h1')).getText();
        expect(heading).toBe('הדיווחים שלי')
    })

    describe('report list', () => {
        let mockReports = data;

        it('should display user reports company names', () => {
            let mockReportsCompanyNmaes = data.map(elm => elm.name)
            let matAccordion = element(by.tagName('mat-accordion'));
            let matExpansionPanel = matAccordion.all(by.className('firstExpansionPanel'));
            let matExpansionPanelHeader = matExpansionPanel.all(by.tagName('mat-expansion-panel-header'));
            let matPanelTitle = matExpansionPanelHeader.all(by.className('companyName'));
            let companyNames = matPanelTitle.map(elm => {
                return elm.getText().then(text => text)
            })
            companyNames.then(names => {
                expect(names).toEqual(mockReportsCompanyNmaes)
            })
        })

        it('should display reports data correctly', () => {
            let appData = data.map(report => {
               return report.reports
            })
            let companyREports = [];
            appData.forEach(elm =>{
                elm.forEach(elm =>{
                    companyREports.push({
                        shotefPlus: elm.shotefPlus,
                        delay: elm.delay,
                        comment: elm.comment
                    })
                })
            })
            
            let matAccordion = element(by.tagName('mat-accordion'));
            let matExpansionPanel = matAccordion.all(by.className('firstExpansionPanel'));
            let secondMatExpansionPanel = matExpansionPanel.all(by.className('secondExpansionPanel'));
            let reports = secondMatExpansionPanel.map(elm => {
                let report: Report = {};
                let promises = [];
                let inputs = elm.all(by.tagName('input'))
                let textArea = elm.all(by.tagName('textarea'))
                promises.push(inputs.get(0).getAttribute('value').then(text => {
                    report.shotefPlus = +text;
                }))

                promises.push(inputs.get(1).getAttribute('value').then(text => {
                    report.delay = +text;
                }))

                promises.push(textArea.get(0).getAttribute('value').then(text => {
                    report.comment = text;
                }))
                return Promise.all(promises).then(() => report)
            })

            reports.then(reports => {
                expect(reports.length).toEqual(companyREports.length);
                expect(reports).toEqual(companyREports)
            })
        })
    })

    describe('report area',()=>{
        it('should open evidence',()=>{
            let matAccordion = element(by.tagName('mat-accordion'));
            let matExpansionPanel = matAccordion.all(by.className('firstExpansionPanel')); 
            matExpansionPanel.get(0).click();
            
            expect(element.all(by.className('secondExpansionPanel')).get(0).isPresent()).toBe(true)

            element.all(by.className('secondExpansionPanel')).get(0).click();
            expect(element(by.tagName('form')).isPresent()).toBe(true)

            expect(element(by.className('evidence')).isPresent()).toBe(true)

            element(by.className('openEvidence')).click();
            
            let evidence = element(by.className('evidenceDialog'))
            expect(evidence.isPresent()).toBe(true)    
        })
    })
})