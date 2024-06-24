import { Component } from '@angular/core';
import { HeaderComponent } from "../../Component/header/header.component";
import { InputOutputChildComponent } from '../../Component/input-output-child/input-output-child.component';

@Component({
    selector: 'app-input-output-parent',
    standalone: true,
    templateUrl: './input-output-parent.component.html',
    styleUrl: './input-output-parent.component.scss',
    imports: [HeaderComponent, InputOutputChildComponent]
})
export class InputOutputParentComponent {
  title = 'Parent Component';
  parentMessage = 'Message from Parent';
  message!: string;

  receiveMessage($event: string) {
    this.message = $event;
  }
}
