/** QR Code 點餐系統前台 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { FormInputTextComponent } from '../../../../shared/components/forms/form-input-text/form-input-text.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from '../../../../shared/service/api/api.service';
import { Menu } from '../shared/menu-obj';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-qrcode-order-user-interface',
  standalone: true,
  templateUrl: './qrcode-order-user-interface.component.html',
  styleUrl: './qrcode-order-user-interface.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, FormInputTextComponent, ButtonComponent, IconComponent]
})
export class QRCodeOrderUserInterfaceComponent implements OnInit {
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
  /** 桌號輸入底部彈窗顯示動畫 */
  tableNumberAnimation: boolean = false;
  /** 餐點成功加入訂單訊息 */
  successMessage: string = '';
  /** 顯示餐點成功加入訂單 */
  showSuccessAddToOrder: boolean = false;
  /** 餐點成功加入訂單彈窗顯示動畫 */
  successAddToOrderAnimation: boolean = false;
  /** 餐點成功加入訂單彈窗 timeout 控制 */
  successAddToOrderAnimationTimeout1: any;
  successAddToOrderAnimationTimeout2: any;
  successAddToOrderAnimationTimeout3: any;
  /** 確認當前餐點按鈕顯示動畫 */
  confirmButtonAnimation: boolean = false;
  /** 確認餐點訂單彈窗顯示 */
  showConfirmOrder: boolean = false;
  /** 確認餐點訂單彈窗顯示動畫 */
  confirmOrderAnimation: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      tableNumber: [''],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.tableNumberAnimation = true;
    }, 10);
  }

  /** 確認桌號 */
  confirmTableNumber(): void {
    const table = this.form.value.tableNumber;
    if (!table || !table.trim()) {
      alert('請先輸入桌號！');
      return;
    }
    this.tableNumberAnimation = false;
    setTimeout(() => {
      this.showTableNumber = false;
    }, 300);
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

    if (!this.confirmButtonAnimation) {
      setTimeout(() => {
        this.confirmButtonAnimation = true;
      }, 10);
    }
  }

  /** 顯示餐點加入訂單 Toast */
  showToast(message: string) {
    this.successMessage = message;

    clearTimeout(this.successAddToOrderAnimationTimeout1);
    clearTimeout(this.successAddToOrderAnimationTimeout2);
    clearTimeout(this.successAddToOrderAnimationTimeout3);

    this.showSuccessAddToOrder = true;
    this.successAddToOrderAnimation = false;

    this.successAddToOrderAnimationTimeout1 = setTimeout(() => {
      this.successAddToOrderAnimation = true;
    }, 10);

    this.successAddToOrderAnimationTimeout2 = setTimeout(() => {
      this.successAddToOrderAnimation = false;
    }, 1700);

    this.successAddToOrderAnimationTimeout3 = setTimeout(() => {
      this.showSuccessAddToOrder = false;
    }, 2000);
  }

  /** 開啟餐點訂單彈窗 */
  openConfirmModal(): void {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }
    this.showConfirmOrder = true;
    setTimeout(() => {
      this.confirmOrderAnimation = true;
    }, 10);
  }

  /** 關閉餐點訂單彈窗 */
  closeConfirmModal(): void {
    this.confirmOrderAnimation = false;
    setTimeout(() => {
      this.showConfirmOrder = false;
    }, 300);
  }

  /** 取得全部餐點訂單數量 */
  get totalQuantity(): number {
    return this.currentOrder.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 取得確認餐點總金額 */
  get totalAmount(): number {
    return this.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /** 確認餐點訂單中增加餐點份量功能 */
  increaseItemQuantity(item: any) {
    item.quantity += 1;
  }

  /** 確認餐點訂單中減少餐點份量功能 */
  decreaseItemQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item);
    }
  }

  /** 確認餐點訂單中移除餐點功能 */
  removeItem(item: any) {
    const index = this.currentOrder.indexOf(item);
    if (index > -1) {
      this.currentOrder.splice(index, 1);
    }

    if (this.currentOrder.length === 0) {
      this.confirmButtonAnimation = false;
      this.closeConfirmModal();
    }
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
      this.closeConfirmModal();
      this.confirmButtonAnimation = false;
    } catch (error) {
      console.error('提交訂單失敗:', error);
      alert('提交訂單失敗，請稍後再試！');
    }
  }
}
