/** QR Code 點餐系統後台 */

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from '../../../../shared/service/api/api.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-qrcode-order-admin-panel',
  standalone: true,
  templateUrl: './qrcode-order-admin-panel.component.html',
  styleUrl: './qrcode-order-admin-panel.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, ButtonComponent]
})
export class QRCodeOrderAdminPanelComponent implements OnInit {
  /** API URL */
  // apiUrl = 'http://localhost:4000';
  apiUrl = 'https://test-express-api-x0j9.onrender.com';
  /** 待處理訂單 */
  orders: any[] = [];
  /** 載入狀態 */
  isLoading = true;
  /** 營業報表 */
  report: any = null;
  /** socket */
  private socket: any;

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.fetchOrders();
    if (isPlatformBrowser(this.platformId)) {
      this.setupSocketListeners();
    }
  }

  /** Socket 監聽 */
  setupSocketListeners() {
    this.socket = io(this.apiUrl);
    this.socket.on('newOrder', (order: any) => {
      this.orders.push(order);
    });
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
        this.orders = [];
        this.report = null;
        alert('資料庫已清空');
      } catch (error) {
        console.error('清空資料庫失敗:', error);
      }
    }
  }

  /** 計算訂單總額 */
  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }
}
