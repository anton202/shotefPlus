import { StatusMessageComponent } from './status-message.component';

describe('status-message component',()=>{
    let statusMessageComponent:StatusMessageComponent = null;

    beforeEach(()=>{
        statusMessageComponent = new StatusMessageComponent();
    })

    it('should set inctance corectly',()=>{
        expect(statusMessageComponent).not.toBeNull()
    })

    it('should return green if messageType property is set to success',()=>{
        statusMessageComponent.messageType = 'success';
        let color = statusMessageComponent.setColor();

        expect(color).toBe('green')
    })

    it('should return green if messageType property is not set to success',()=>{
        statusMessageComponent.messageType = 'fail';
        let color = statusMessageComponent.setColor();

        expect(color).toBe('red')
    })
})