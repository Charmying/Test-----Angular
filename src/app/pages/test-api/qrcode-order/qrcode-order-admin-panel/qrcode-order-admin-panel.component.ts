/** QR Code 點餐系統後台 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from '../../../../shared/service/api/api.service';

@Component({
  selector: 'app-qrcode-order-admin-panel',
  standalone: true,
  templateUrl: './qrcode-order-admin-panel.component.html',
  styleUrl: './qrcode-order-admin-panel.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, ButtonComponent]
})
export class QRCodeOrderAdminPanelComponent implements OnInit {
  /** FormGroup */
  form: FormGroup;
  /** API URL */
  apiUrl = 'http://localhost:4000';
  /** 表格資料 */
  orders: any[] = [];
  /** 載入狀態 */
  isLoading = true;
  /** 營業報表 */
  report: any = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      tableNumber: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.fetchOrders();
  }

  /** 獲取訂單資料 */
  async fetchOrders() {
    this.isLoading = true;
    try {
      this.orders = await this.apiService.get<any[]>(`${this.apiUrl}/qrcodeOrder/orders`);
    } catch (error) {
      console.error('訂單載入失敗:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /** 標記訂單完成 */
  async completeOrder(id: string) {
    try {
      await this.apiService.put<any>(`${this.apiUrl}/qrcodeOrder/orders/${id}/complete`, {});
      this.orders = this.orders.filter(order => order._id !== id);
    } catch (error) {
      console.error('更新訂單狀態失敗:', error);
    }
  }

  /** 生成營業報表 */
  async generateReport() {
    try {
      this.report = await this.apiService.get<any>(`${this.apiUrl}/qrcodeOrder/reports`);
    } catch (error) {
      console.error('生成報表失敗:', error);
    }
  }

  /** 清空資料庫 */
  async clearDatabase() {
    if (confirm('確定要清空資料庫嗎？此操作無法復原！')) {
      try {
        await this.apiService.delete(`${this.apiUrl}/qrcodeOrder/clear`);
        this.orders = []; // 清空前端訂單列表
        this.report = null; // 清空報表
        alert('資料庫已清空');
      } catch (error) {
        console.error('清空資料庫失敗:', error);
      }
    }
  }
}
