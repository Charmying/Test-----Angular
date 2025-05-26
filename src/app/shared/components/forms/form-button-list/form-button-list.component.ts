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
  /** 選中狀態的文字顏色 */
  @Input() checkedTextColor?: string;
  /** 選中狀態的邊框顏色 */
  @Input() checkedBorderColor?: string;
  /** 選中狀態的背景色 */
  @Input() checkedBackgroundColor?: string;
   /** 未選中狀態的文字顏色 */
  @Input() uncheckedTextColor?: string;
  /** 未選中狀態的邊框顏色 */
  @Input() uncheckedBorderColor?: string;
  /** 未選中狀態的背景色 */
  @Input() uncheckedBackgroundColor?: string;

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

  getButtonClass(item: BaseCommonObj): string {
    const isChecked = this.isChecked(item);
    let bgClass: string;
    let textClass: string;
    let borderClass: string;

    if (isChecked) {
      bgClass = this.checkedBackgroundColor ? this.checkedBackgroundColor : 'bg-black';
      textClass = this.checkedTextColor ? this.checkedTextColor : 'text-white';
      borderClass = this.checkedBorderColor ? this.checkedBorderColor : 'border-black';
    } else {
      bgClass = this.uncheckedBackgroundColor ? this.uncheckedBackgroundColor : 'bg-white';
      textClass = this.uncheckedTextColor ? this.uncheckedTextColor : 'text-black';
      borderClass = this.uncheckedBorderColor ? this.uncheckedBorderColor : 'border-black';
    }

    return `${bgClass} ${textClass} ${borderClass}`;
  }
}
