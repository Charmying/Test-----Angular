import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-form-counter-input',
  templateUrl: './form-counter-input.component.html',
  styleUrls: ['./form-counter-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
})
export class FormCounterInputComponent {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** formControlName */
  @Input() formControlName = '';
  /** 當數值變更時進行 emit */
  @Output() valueChanged = new EventEmitter<string>();

  ngOnInit() {
    // 確保表單控制項的初始值為字串
    const control = this.form.get(this.formControlName);
    if (control && typeof control.value !== 'string') {
      control.setValue(control.value.toString());
    }
  }

  /** 增加值 */
  increase() {
    const currentValue = parseInt(this.form.get(this.formControlName)?.value || '0');
    const newValue = (currentValue + 1).toString();
    this.form.get(this.formControlName)?.setValue(newValue);
    this.valueChanged.emit(newValue);
  }

  /** 減少值 */
  decrease() {
    const currentValue = parseInt(this.form.get(this.formControlName)?.value || '0');
    const newValue = (currentValue - 1).toString();
    this.form.get(this.formControlName)?.setValue(newValue);
    this.valueChanged.emit(newValue);
  }

  /** 輸入框失去焦點發出當前值 */
  onBlur() {
    const value = this.form.get(this.formControlName)?.value || '0';
    this.valueChanged.emit(value);
  }

  /** 過濾非數字輸入 */
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const filteredValue = input.value.replace(/[^0-9]/g, '');
    if (input.value !== filteredValue) {
      input.value = filteredValue;
      this.form.get(this.formControlName)?.setValue(filteredValue);
    }
  }
}
