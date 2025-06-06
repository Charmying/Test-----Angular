/** QR Code 點餐系統登入頁 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/service/api/api.service';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { FormInputTextComponent } from '../../../../shared/components/forms/form-input-text/form-input-text.component';
import { FormInputPasswordComponent } from '../../../../shared/components/forms/form-input-password/form-input-password.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-qrcode-order-login',
  standalone: true,
  templateUrl: './qrcode-order-login.component.html',
  styleUrl: './qrcode-order-login.component.scss',
  imports: [ CommonModule, SectionComponent, FormInputTextComponent, FormInputPasswordComponent, ButtonComponent ]
})
export class QRCodeOrderLoginComponent {
  /** FormGroup */
  form!: FormGroup;
  /** 錯誤訊息 */
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  async login() {
    try {
      const result = await this.apiService.post<any>(`${this.apiService.getApiUrl()}/auth/login`, {
        username: this.form.value.username,
        password: this.form.value.password
      });
      localStorage.setItem('token', result.token);
      this.router.navigate(['/pages/test-api/qrcode-order-admin-panel']);
    } catch (err: any) {
      this.errorMessage = err.error?.error || '登入失敗';
    }
  }
}
