import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo-forms-validators',
  standalone: true,
  templateUrl: './demo-forms-validators.component.html',
  styleUrl: './demo-forms-validators.component.scss',
  imports: [],
})
export class DemoFormsValidatorsComponent {
  /** FormGroup */
  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({});
  }
}
