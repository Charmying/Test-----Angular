import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../../../../../../shared/service/api/api.service';
import { FormInputTextComponent } from '../../../../../../shared/components/forms/form-input-text/form-input-text.component';
import { FormInputPasswordComponent } from '../../../../../../shared/components/forms/form-input-password/form-input-password.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-qrcode-order-admin-management',
  standalone: true,
  templateUrl: './qrcode-order-admin-management.component.html',
  styleUrl: './qrcode-order-admin-management.component.scss',
  imports: [CommonModule, FormInputTextComponent, FormInputPasswordComponent, ButtonComponent],
})
export class QRCodeOrderAdminManagementComponent implements OnInit {
  /** FormGroup */
  form!: FormGroup;
  /** 是否為管理者登入 */
  isAdmin = false;
  /** 新增使用者結果訊息 */
  registerResult = '';
  /** 修改密碼結果訊息 */
  updatedPasswordResult = '';

  constructor(private apiService: ApiService, private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      newUsername: [''],
      newPassword: [''],
      oldPassword: [''],
      updatedPassword: [''],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.isAdmin = decoded.role === 'admin';
    }
  }

  /** 新增使用者 */
  async register() {
    if (!this.form.value.newUsername || !this.form.value.newPassword) {
      this.registerResult = '請輸入帳號和密碼';
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const result: any = await this.http.post(`${this.apiService.getApiUrl()}/auth/register`, {
        username: this.form.value.newUsername,
        password: this.form.value.newPassword,
      }, { headers }).toPromise();

      this.registerResult = result.message;
    } catch (err: any) {
      this.registerResult = '使用者新增失敗';
    }
  }

  /** 修改密碼 */
  async changePassword() {
    if (!this.form.value.oldPassword || !this.form.value.updatedPassword) {
      this.updatedPasswordResult = '請輸入舊密碼和新密碼';
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const result: any = await this.http.put(`${this.apiService.getApiUrl()}/auth/change-password`, {
        oldPassword: this.form.value.oldPassword,
        newPassword: this.form.value.updatedPassword,
      }, { headers }).toPromise();

      this.updatedPasswordResult = result.message;
    } catch (err: any) {
      this.updatedPasswordResult = '修改失敗';
    }
  }
}
