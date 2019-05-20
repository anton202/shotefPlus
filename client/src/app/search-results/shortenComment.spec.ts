import { ShortenCommentPipe } from './shortenComment.pipe';
import { loadDirective } from '@angular/core/src/render3/instructions';

describe('shorten comment pipe test', () => {
    let pipe: ShortenCommentPipe = null;
    let str = `sjdnf jsngo lsgj owesnls osfznlskd kndf lw 
                   sdfknlknseoaj aklsfnoei  jdgnsjknsjkngskb`;
    
    beforeEach(() => {
        pipe = new ShortenCommentPipe();    
    })

    it('should have a valid contrucor', () => {
        expect(pipe).not.toBeNull()
    })

    it('should return a shorten string with a length of 53 characters', () => {
        let shortenStr = pipe.transform(str)
        expect(shortenStr.length).toBe(53)
    })
    
    it('should add three dots at the end of a shorten comment',()=>{
        let shortenStr = pipe.transform(str)
        expect(shortenStr.substr(50,53)).toBe('...')
    })

    it('should return the comment unshortend if less than 50 characters',()=>{
        let str = 'this sentence is less than 50 charcters';
        let notShorten = pipe.transform(str);
        expect(notShorten).toBe(str)
    })

    afterEach(()=>{
        pipe = null;
    })
})