import { browser, by, element } from 'protractor';


describe('app component',()=>{
    beforeEach(()=>{
        browser.get('/')
    })

    it('should open sign up dialog',()=>{
        const signUpButton = element(by.id('signUp'));
        signUpButton.click();
        expect(element(by.css('mat-dialog-container')).isDisplayed()).toBe(true);
    })

    it('should display submit delay component',()=>{
        expect(element(by.css('app-submit-delay')).isDisplayed()).toBe(true)
    })

    it('should display search component',()=>{
        expect(element(by.css('app-search-business')).isDisplayed()).toBe(true)
    })
    
})

