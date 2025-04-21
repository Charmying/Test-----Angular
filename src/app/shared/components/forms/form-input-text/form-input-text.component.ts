import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormInputTextComponent {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** 類型 */
  @Input() type: 'text' | 'number' | 'email' | 'tel' = 'text';
  /** formControlName */
  @Input() formControlName = '';
  /** placeHolder */
  @Input() placeHolder = '';

  get control() {
    return this.form.get(this.formControlName);
  }

  get showError(): boolean {
    return (this.control?.invalid && this.control?.touched) ?? false;
  }
}
