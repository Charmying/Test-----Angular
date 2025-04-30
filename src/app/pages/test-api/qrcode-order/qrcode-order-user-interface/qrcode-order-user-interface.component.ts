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
  /** 當前餐點訂單 */
  currentOrder: any[] = [];
  /** 桌號輸入底部彈窗顯示 */
  showTableNumber: boolean = true;
  /** 餐點成功加入訂單訊息 */
  successMessage: string = '';
  /** 顯示餐點成功加入訂單 */
  showSuccessToast: boolean = false;
  /** 餐點成功加入訂單控制動畫 */
  toastVisible: boolean = false;
  /** 確認餐點訂單彈窗顯示 */
  showConfirmOrder: boolean = false;

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
    this.showTableNumber = false;
  }

  /** 餐點加入訂單 */
  addToOrder(item: any) {
    const existingItem = this.currentOrder.find(orderItem => orderItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.currentOrder.push({ ...item, quantity: 1 });
    }
    this.showToast(`成功加入 ${item.name}！`);
  }

  /** 顯示餐點加入訂單 Toast */
  showToast(message: string) {
    this.successMessage = message;
    this.showSuccessToast = true;
    setTimeout(() => {
      this.toastVisible = true;
    }, 10); // 延遲 0.01 秒，讓動畫觸發

    setTimeout(() => {
      this.toastVisible = false;
    }, 1900); // 顯示 1.9 秒後觸發收回動畫

    setTimeout(() => {
      this.showSuccessToast = false;
    }, 2200); // 2.2 秒後關掉整個 Toast
  }

  /** 開啟餐點訂單彈窗 */
  openConfirmModal(): void {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }
    this.showConfirmOrder = true;
  }

  /** 關閉餐點訂單彈窗 */
  closeConfirmModal(): void {
    this.showConfirmOrder = false;
  }

  /** 取得全部餐點訂單數量 */
  get totalQuantity(): number {
    return this.currentOrder.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 取得確認餐點總金額 */
  get totalAmount(): number {
    return this.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /** 提交餐點訂單 */
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
