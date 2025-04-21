import { Component } from '@angular/core';
import { FormInputTextComponent } from '../../../shared/components/forms/form-input-text/form-input-text.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormInputPasswordComponent } from '../../../shared/components/forms/form-input-password/form-input-password.component';
import { FormButtonListComponent } from '../../../shared/components/forms/form-button-list/form-button-list.component';
import { BaseCommonObj, BasicSelect } from '../../../shared/class/common';
import { FormCheckboxListComponent } from '../../../shared/components/forms/form-checkbox-list/form-checkbox-list.component';
import { FormCounterInputComponent } from '../../../shared/components/forms/form-counter-input/form-counter-input.component';
import { FormSingleSelectComponent } from '../../../shared/components/forms/form-single-select/form-single-select.component';
import { FormMultipleSelectComponent } from '../../../shared/components/forms/form-multiple-select/form-multiple-select.component';

@Component({
  selector: 'app-demo-forms',
  standalone: true,
  templateUrl: './demo-forms.component.html',
  styleUrl: './demo-forms.component.scss',
  imports: [FormInputTextComponent, ButtonComponent, FormInputPasswordComponent, FormButtonListComponent, FormCheckboxListComponent, FormCounterInputComponent, FormSingleSelectComponent, FormMultipleSelectComponent],
})
export class DemoFormsComponent {
  /** FormGroup */
  form!: FormGroup;

  buttonListData: BaseCommonObj[] = [
    { id: '1', name: 'item 1' },
    { id: '2', name: 'item 2' },
  ];

  checkboxListData: BaseCommonObj[] = [
    { id: '1', name: 'item 1' },
    { id: '2', name: 'item 2' },
  ];

  singleSelectOptions: BasicSelect[] = [
    { id: '1', name: '選項 1', state: false },
    { id: '2', name: '選項 2', state: false },
    { id: '3', name: '選項 3', state: true },
    { id: '4', name: '選項 4', state: false },
  ];

  multipleSelectOptions: any[] = [
    { id: 'all', name: '全部選項', isSelectAll: true },
    { id: '1', name: '選項 1' },
    { id: '2', name: '選項 2' },
    { id: '3', name: '選項 3' },
    { id: '4', name: '選項 4' },
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
      checkboxList: [['2']],
      plus_minus: ['0'],
      singleSelect: [''],
      multipleSelect: [['2', '4']],
    });
  }

  /** 檢查 FormGroup */
  click() {
    console.log(this.form.value)
  }
}
