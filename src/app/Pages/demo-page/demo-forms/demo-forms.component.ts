import { Component } from '@angular/core';
import { FormInputTextComponent } from '../../../shared/components/forms/form-input-text/form-input-text.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormInputPasswordComponent } from '../../../shared/components/forms/form-input-password/form-input-password.component';
import { FormButtonListComponent } from '../../../shared/components/forms/form-button-list/form-button-list.component';
import { BaseCommonObj } from '../../../shared/class/common';

@Component({
  selector: 'app-demo-forms',
  standalone: true,
  templateUrl: './demo-forms.component.html',
  styleUrl: './demo-forms.component.scss',
  imports: [FormInputTextComponent, ButtonComponent, FormInputPasswordComponent, FormButtonListComponent],
})
export class DemoFormsComponent {
  /** FormGroup */
  form!: FormGroup;

  buttonListData: BaseCommonObj[] = [
    { id: '1', name: 'item 1' },
    { id: '2', name: 'item 2' },
  ];
  
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      inputText_text: [''],
      inputText_number: [''],
      inputText_email: [''],
      inputText_tel: [''],
      inputPassword: [''],
      buttonList: [['1']],
    });
  }

  /** 檢查 FormGroup */
  click() {
    console.log(this.form.value)
  }
}
