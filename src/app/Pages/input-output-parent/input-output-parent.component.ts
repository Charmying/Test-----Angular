import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { InputOutputChildComponent } from '../../component/input-output-child/input-output-child.component';
import { SectionComponent } from "../../component/section/section.component";

@Component({
  selector: 'app-input-output-parent',
  standalone: true,
  templateUrl: './input-output-parent.component.html',
  styleUrl: './input-output-parent.component.scss',
  imports: [HeaderComponent, InputOutputChildComponent, SectionComponent]
})
export class InputOutputParentComponent {
  headerTitle = 'Input & Output'
  section1Title = 'Parent Component';
  parentMessage = 'Message from Parent';
  message!: string;

  receiveMessage($event: string) {
    this.message = $event;
  }
}
