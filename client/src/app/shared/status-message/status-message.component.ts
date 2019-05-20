import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-status-message',
    templateUrl: './status-message.component.html',
    styleUrls: ['./status-message.component.css']
})
export class StatusMessageComponent {
    @Input() messageType: string;
    @Input() message: string;

    constructor() { }

    setColor() {
        return this.messageType === 'success' ? 'green' : 'red'
    }
}