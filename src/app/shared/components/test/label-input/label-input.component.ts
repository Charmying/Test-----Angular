import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './label-input.component.html',
  styleUrl: './label-input.component.scss'
})
export class LabelInputComponent {
  @Input() label: string = '';
  @Input() inputType: string = 'text';
  @Input() connectId: string = '';
  @Input() form!: FormGroup; // 接受父組件傳入的 FormGroup
  @Input() controlName: string = ''; // 控制元件的名稱，用於 FormGroup 的 formControlName

  constructor() {}

  get control() {
    return this.form.get(this.controlName) as FormControl;
  }
}
