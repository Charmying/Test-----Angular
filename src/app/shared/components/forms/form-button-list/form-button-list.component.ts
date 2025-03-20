import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseCommonObj } from '../../../class/common';

@Component({
  selector: 'app-form-button-list',
  templateUrl: './form-button-list.component.html',
  styleUrls: ['./form-button-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormButtonListComponent implements OnInit {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** 按鈕選項 */
  @Input() data: BaseCommonObj[] = [];
  /** formControlName */
  @Input() formControlName = '';

  ngOnInit(): void {
    const initialValue = this.form.get(this.formControlName)?.value || [];
    this.form.get(this.formControlName)?.setValue(initialValue);
  }

  selectButton(item: BaseCommonObj): void {
    const currentValue = this.form.get(this.formControlName)?.value || [];
    if (currentValue.includes(item.id)) {
      this.form.get(this.formControlName)?.setValue(currentValue.filter((id: string) => id !== item.id));
    } else {
      this.form.get(this.formControlName)?.setValue([...currentValue, item.id]);
    }
  }

  isChecked(item: BaseCommonObj): boolean {
    const currentValue = this.form.get(this.formControlName)?.value || [];
    return currentValue.includes(item.id);
  }
}
