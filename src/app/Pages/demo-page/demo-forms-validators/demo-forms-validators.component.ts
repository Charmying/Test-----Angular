import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormInputTextComponent } from '../../../shared/components/forms/form-input-text/form-input-text.component';
import { Validators } from '../../../shared/util/validators';

@Component({
  selector: 'app-demo-forms-validators',
  standalone: true,
  templateUrl: './demo-forms-validators.component.html',
  styleUrl: './demo-forms-validators.component.scss',
  imports: [FormInputTextComponent],
})
export class DemoFormsValidatorsComponent {
  /** FormGroup */
  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      required1: ['', Validators.required()],
      required2: ['', Validators.required('自訂的錯誤訊息')],
      minLength1: ['', Validators.minLength(5)],
      minLength2: ['', Validators.minLength(5, '自訂的錯誤訊息')],
      maxLength1: ['', Validators.maxLength(5)],
      maxLength2: ['', Validators.maxLength(5, '自訂的錯誤訊息')],
      emailFormat1: ['', Validators.emailFormat()],
      emailFormat2: ['', Validators.emailFormat('自訂的錯誤訊息')],
      hasUpperCase1: ['', Validators.hasUpperCase()],
      hasUpperCase2: ['', Validators.hasUpperCase('自訂的錯誤訊息')],
    });
  }
}
