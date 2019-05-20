import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shortenComment'
})
export class ShortenCommentPipe implements PipeTransform {
    transform(value: string) {
        if (value.length > 50) {
            return value.substr(0, 50) + '...';
        }
        return value
    }
}