import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasicSelect } from '../../../class/common';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-form-single-select',
  templateUrl: './form-single-select.component.html',
  styleUrls: ['./form-single-select.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
})
export class FormSingleSelectComponent implements OnInit {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** formControlName */
  @Input() formControlName = '';
  /** 下拉選單選項 */
  @Input() options: BasicSelect[] = [];

  ngOnInit() {
    const defaultOption = this.options.find(option => option.state);
    if (defaultOption) {
      this.form.get(this.formControlName)?.setValue(defaultOption.id);
    }
  }
}
