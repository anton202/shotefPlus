import { fakeAsync, tick } from '@angular/core/testing';
import { ReadImgService } from './readImg.service';

describe(' read img service', ()=>{
    let imgService: ReadImgService;
    let filePaths = ['/home/anton/Pictures/arguing-parents.jpg']

    beforeEach(()=>{
        imgService = new ReadImgService();
    })

    it('should return array of encoded imgs',fakeAsync(()=>{
        const blobObj = new Blob(filePaths)

        imgService.readFile([blobObj])
            .subscribe(result =>{
                expect(result).toBeTruthy()
            })  
            tick(10000)
    }))

    
})