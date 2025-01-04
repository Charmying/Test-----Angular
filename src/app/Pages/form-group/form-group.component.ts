import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../Component/header/header.component";
import { SectionComponent } from "../../Component/section/section.component";
import { LabelInputComponent } from "../../Component/label-input/label-input.component";

@Component({
  selector: 'app-form-group',
  standalone: true,
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SectionComponent, LabelInputComponent] // 直接在這裡導入 ReactiveFormsModule，FormGroup 要用
})
export class FormGroupComponent {
  headerTitle = 'FormGroup';
  section1Title = 'FormGroup 簡單範例 (在 constructor() 裡初始化)';
  section2Title = 'FormGroup 簡單範例 (用 非空斷言操作符(!) 在 ngOnInit() 裡初始化)';
  section3Title = 'FormGroup 簡單範例 (使用 FormGroup 和 FormBuilder 在 constructor() 裡初始化)';

  name1 = 'Name:';
  nameInputType1 = 'text';
  nameControlName1 = 'name';
  email1 = 'Email:';
  emailInputType1 = 'text';
  emailControlName1 = 'email';
  name2 = 'Name:';
  nameInputType2 = 'text';
  nameControlName2 = 'name';
  email2 = 'Email:';
  emailInputType2 = 'text';
  emailControlName2 = 'email';
  email3 = 'Email';
  phoneNumber3 = 'phoneNumber';
  showErrors = false;
  emailError3 = 'Please enter a valid email address.';
  phoneNumberError3 = 'Please enter a valid phone number.';
  labelType3: string = '';
  inputType3: string = '';
  controlName3: string = '';
  selectedOption: 'email' | 'phone' | null = null;
  myForm1: FormGroup;
  myForm2!: FormGroup;
  myForm3: FormGroup;
  formData1: any; // 用來保存表單數據
  formData2: any; // 用來保存表單數據
  formData3: any; // 用來保存表單數據

  constructor(private fb: FormBuilder) {
    this.myForm1 = new FormGroup({
      name: new FormControl('Charmy1'), // 預設 name 的 input value 是 Charmy1
      email: new FormControl('')
    });
    
    this.myForm3 = this.fb.group({
      option: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit() {
    this.myForm2 = new FormGroup({
      name: new FormControl('Charmy2'), // 預設 name 的 input value 是 Charmy2
      email: new FormControl('')
    });
  }


  onSubmit1() {
    console.log(this.myForm1.value);
    this.formData1 = this.myForm1.value;
  }

  onSubmit2() {
    console.log(this.myForm2.value);
    this.formData2 = this.myForm2.value;
  }

  onSubmit3() {
    if (this.myForm3.valid) {
      console.log(this.myForm3.value);
      this.formData3 = this.myForm3.value;
    } else {
      this.showErrors = true;
    }
  }

  onOptionChange(option: 'email' | 'phone') {
    this.showErrors = false;
    this.selectedOption = option;

    if (option === 'email') {
      this.labelType3 = 'Email:';
      this.inputType3 = 'email';
      this.controlName3 = 'email';
      this.myForm3.get('phone')?.setValue('');
      this.myForm3.get('email')?.setValidators([Validators.required, Validators.email]);
      this.myForm3.get('phone')?.clearValidators();
    } else if (option === 'phone') {
      this.labelType3 = 'Phone:';
      this.inputType3 = 'text';
      this.controlName3 = 'phone';
      this.myForm3.get('email')?.setValue('');
      this.myForm3.get('phone')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
      this.myForm3.get('email')?.clearValidators();
    }

    this.myForm3.get('email')?.updateValueAndValidity();
    this.myForm3.get('phone')?.updateValueAndValidity();
  }
}
