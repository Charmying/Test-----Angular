import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../Component/header/header.component";

@Component({
    selector: 'app-form-group',
    standalone: true,
    templateUrl: './form-group.component.html',
    styleUrl: './form-group.component.scss',
    imports: [CommonModule, ReactiveFormsModule, HeaderComponent] // 直接在這裡導入 ReactiveFormsModule，FormGroup 要用
})
export class FormGroupComponent {
  headerTitle = 'FormGroup';

  myForm1: FormGroup;
  myForm2!: FormGroup;
  formData1: any; // 用來保存表單數據
  formData2: any; // 用來保存表單數據

  constructor() {
    this.myForm1 = new FormGroup({
      name: new FormControl('Charmy1'), // 預設 name 的 input value 是 Charmy1
      email: new FormControl('')
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
    this.formData1 = this.myForm1.value; // 保存表單數據到 formData
  }

  onSubmit2() {
    console.log(this.myForm2.value);
    this.formData2 = this.myForm2.value; // 保存表單數據到 formData
  }
}
