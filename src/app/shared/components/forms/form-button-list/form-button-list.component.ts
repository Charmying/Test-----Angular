import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseCommonObj } from '../../../class/common';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-form-button-list',
  templateUrl: './form-button-list.component.html',
  styleUrls: ['./form-button-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
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
  /** 是否為多選模式，預設為 false（單選） */
  @Input() multiple = false;

  ngOnInit(): void {
    const control = this.form.get(this.formControlName);
    if (!control) return;

    const initialValue = control.value;
    if (this.multiple) {
      control.setValue(initialValue || []);
    } else {
      control.setValue(initialValue || null);
    }
  }

  selectButton(item: BaseCommonObj): void {
    const control = this.form.get(this.formControlName);
    if (!control) return;

    const currentValue = control.value;

    if (this.multiple) {
      const selectedIds: string[] = currentValue || [];
      if (selectedIds.includes(item.id)) {
        control.setValue(selectedIds.filter(id => id !== item.id));
      } else {
        control.setValue([...selectedIds, item.id]);
      }
    } else {
      control.setValue(currentValue === item.id ? null : item.id);
    }
  }

  isChecked(item: BaseCommonObj): boolean {
    const control = this.form.get(this.formControlName);
    if (!control) return false;

    const value = control.value;
    return this.multiple ? (value || []).includes(item.id) : value === item.id;
  }
}
