import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:'shortenComment'
})
export class ShortenCommentPipe implements PipeTransform{
   transform(value:any){
    return value.substr(0,50) + '...';
   } 
}