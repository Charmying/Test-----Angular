import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [],
  templateUrl: './label-input.component.html',
  styleUrl: './label-input.component.scss'
})
export class LabelInputComponent {
  @Input() label: string = '';
  @Input() inputType: string = 'text';
  @Input() connectId: string = '';
}
