import { Component } from '@angular/core';
import { FormInputTextComponent } from '../../../shared/components/forms/form-input-text/form-input-text.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormInputPasswordComponent } from '../../../shared/components/forms/form-input-password/form-input-password.component';

@Component({
  selector: 'app-demo-forms',
  standalone: true,
  templateUrl: './demo-forms.component.html',
  styleUrl: './demo-forms.component.scss',
  imports: [FormInputTextComponent, ButtonComponent, FormInputPasswordComponent],
})
export class DemoFormsComponent {
  /** FormGroup */
  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      inputText_text: [''],
      inputText_number: [''],
      inputText_email: [''],
      inputText_tel: [''],
      inputPassword: [''],
    });
  }

  /** 檢查 FormGroup */
  click() {
    console.log(this.form.value)
  }
}
