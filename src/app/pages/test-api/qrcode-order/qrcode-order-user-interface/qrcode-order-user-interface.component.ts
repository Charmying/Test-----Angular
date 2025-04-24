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
  apiUrl = 'http://localhost:4000';
  /** 菜單項目 */
  menuItems = [
    { name: '瑪格麗特 (五辛奶素)', price: 240 },
    { name: '拿坡里臘腸', price: 320 },
    { name: '芝麻葉生火腿', price: 350 },
    { name: '松露野菇 (奶素)', price: 320 },
    { name: '櫛瓜鮮蝦', price: 320 },
    { name: '青醬舒肥雞', price: 320 },
    { name: '起司四重奏', price: 300 }
  ];
  /** 當前訂單 */
  currentOrder: any[] = [];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      tableNumber: [''],
      // items: this.fb.array([])
    });
  }

  /** 加入訂單 */
  addToOrder(item: any) {
    this.currentOrder.push(item);
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
      this.currentOrder = []; // 清空當前訂單
      this.form.reset(); // 重置表單
    } catch (error) {
      console.error('提交訂單失敗:', error);
      alert('提交訂單失敗，請稍後再試！');
    }
  }
}
