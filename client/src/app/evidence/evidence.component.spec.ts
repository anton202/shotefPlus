import{ EvidenceComponent } from './evidence.component';

describe('evidence Component',()=>{
    let component:EvidenceComponent;

    beforeEach(()=>{
        component = new EvidenceComponent(['img url'])
    })

    it('should creat component',()=>{
        expect(component).not.toBeNull()
    })

    it('should increment currentImg property if right button pressed',()=>{
        component.currentImg = 0;
        component.data.evidence = new Array(3)
        component.changeImg('forward')
        expect(component.currentImg).toBe(1)
    })

    it('should increment currentImg property if right button pressed',()=>{
        component.currentImg = 2;
        component.data.evidence = new Array(3)
        component.changeImg('backward')
        expect(component.currentImg).toBe(1)
    })
})