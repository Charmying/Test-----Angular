import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-output-child',
  standalone: true,
  imports: [],
  templateUrl: './input-output-child.component.html',
  styleUrl: './input-output-child.component.scss'
})
export class InputOutputChildComponent {
  @Input() childMessage!: string;
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Message from Child');
  }
}
