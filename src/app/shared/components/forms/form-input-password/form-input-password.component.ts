import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-form-input-password',
  templateUrl: './form-input-password.component.html',
  styleUrls: ['./form-input-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
})
export class FormInputPasswordComponent {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** formControlName */
  @Input() formControlName = '';
  /** placeHolder */
  @Input() placeHolder = '';

  /** 是否為 password */
  isPassword = true;

  /** 密碼顯示/隱藏 */
  showPassword(): void {
    this.isPassword = !this.isPassword;
  }

  get control() {
    return this.form.get(this.formControlName);
  }

  get showError(): boolean {
    return (this.control?.invalid && this.control?.touched) ?? false;
  }
}
