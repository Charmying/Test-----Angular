/** QR Code 點餐系統前台 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { FormInputTextComponent } from '../../../../shared/components/forms/form-input-text/form-input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from '../../../../shared/service/api/api.service';
import { Menu } from '../shared/menu-obj';

@Component({
  selector: 'app-qrcode-order-user-interface',
  standalone: true,
  templateUrl: './qrcode-order-user-interface.component.html',
  styleUrl: './qrcode-order-user-interface.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, FormInputTextComponent, ButtonComponent]
})
export class QRCodeOrderUserInterfaceComponent {
  /** FormGroup */
  form: FormGroup;
  /** API URL */
  // apiUrl = 'http://localhost:4000';
  apiUrl = 'https://test-express-api-x0j9.onrender.com';
  /** 菜單項目 */
  menuItems = Menu
  /** 當前訂單 */
  currentOrder: any[] = [];
  /** 桌號輸入底部彈窗顯示 */
  tableNumberVisible: boolean = true;
  /** 確認餐點彈窗顯示 */
  confirmOrderVisible: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      tableNumber: [''],
    });
  }

  /** 確認桌號 */
  confirmTableNumber(): void {
    const table = this.form.value.tableNumber;
    if (!table || !table.trim()) {
      alert('請先輸入桌號！');
      return;
    }
    this.tableNumberVisible = false;
  }

  /** 加入訂單 */
  addToOrder(item: any) {
    this.currentOrder.push(item);
  }

  /** 開啟確認餐點彈窗 */
  openConfirmModal(): void {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }
    this.confirmOrderVisible = true;
  }

  /** 關閉確認餐點彈窗 */
  closeConfirmModal(): void {
    this.confirmOrderVisible = false;
  }

  /** 提交訂單 */
  async submitOrder() {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }

    const orderData = {
      tableNumber: this.form.value.tableNumber,
      items: this.currentOrder
    };

    try {
      await this.apiService.post<any>(`${this.apiUrl}/qrcodeOrder/orders`, orderData);
      alert('訂單已提交！');
      this.currentOrder = [];
      this.form.reset();
    } catch (error) {
      console.error('提交訂單失敗:', error);
      alert('提交訂單失敗，請稍後再試！');
    }
  }
}
