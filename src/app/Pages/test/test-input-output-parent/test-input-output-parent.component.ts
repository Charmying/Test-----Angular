import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestHeaderComponent } from '../../../shared/components/test/test-header/test-header.component';
import { InputOutputChildComponent } from '../../../shared/components/test/input-output-child/input-output-child.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';

@Component({
  selector: 'app-test-input-output-parent',
  standalone: true,
  templateUrl: './test-input-output-parent.component.html',
  styleUrl: './test-input-output-parent.component.scss',
  imports: [HeaderComponent, TestHeaderComponent, InputOutputChildComponent, SectionComponent]
})
export class TestInputOutputParentComponent {
  headerTitle = 'Input & Output'
  section1Title = 'Parent Component';
  parentMessage = 'Message from Parent';
  message!: string;

  receiveMessage($event: string) {
    this.message = $event;
  }
}
