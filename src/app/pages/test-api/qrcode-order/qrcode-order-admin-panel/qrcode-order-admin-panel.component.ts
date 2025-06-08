/** QR Code 點餐系統後台 */

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { QRCodeOrderAdminTableComponent } from '../shared/component/qrcode-order-admin-table/qrcode-order-admin-table.component';
import { QRCodeOrderAdminOrderComponent } from '../shared/component/qrcode-order-admin-order/qrcode-order-admin-order.component';
import { QRCodeOrderAdminReportComponent } from '../shared/component/qrcode-order-admin-report/qrcode-order-admin-report.component';
import { QRCodeOrderAdminManagementComponent } from '../shared/component/qrcode-order-admin-management/qrcode-order-admin-management.component';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-order-admin-panel',
  standalone: true,
  templateUrl: './qrcode-order-admin-panel.component.html',
  styleUrl: './qrcode-order-admin-panel.component.scss',
  imports: [CommonModule, ButtonComponent, QRCodeOrderAdminTableComponent, QRCodeOrderAdminOrderComponent, QRCodeOrderAdminReportComponent, QRCodeOrderAdminManagementComponent]
})
export class QRCodeOrderAdminPanelComponent {
  /** 載入狀態 */
  isLoading = true;
  /** 子層 component */
  links: any[] = [
    { title: '桌號資訊' },
    { title: '點餐狀況' },
    { title: '營業報表' },
    { title: '帳號管理' },
  ]
  /** 選擇顯示子層 component (預設) */
  options = '桌號資訊'
  /** 桌號資訊 */
  tables: any[] = [];
  /** socket */
  private socket: any;
  /** 待處理訂單 */
  orders: any[] = [];
  /** 營業報表 */
  report: any = null;
  /** 新餐點提醒彈窗顯示 */
  showNewOrderRemindModal = false;
  /** 新餐點提醒彈窗顯示動畫 */
  showNewOrderRemindAnimation: boolean = false;

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  async ngOnInit() {
    try {
      await this.fetchInitialData();
      if (isPlatformBrowser(this.platformId)) {
        this.setupSocketListeners();
      }
    } catch (error) {
      console.error('初始化失敗:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /** 切換預顯示 component */
  changeOptions(title: string) {
    this.options = title;
    if (title === '點餐狀況') {
      this.fetchOrders();
    }
  }

  /** 獲取所有初始資料 */
  async fetchInitialData() {
    try {
      const [tables, orders, report] = await Promise.all([
        this.apiService.get<any[]>(`${this.apiService.getApiUrl()}/qrcodeOrder/tables`),
        this.apiService.get<any[]>(`${this.apiService.getApiUrl()}/qrcodeOrder/orders`),
        this.apiService.get<any>(`${this.apiService.getApiUrl()}/qrcodeOrder/reports`),
      ]);

      this.tables = tables;
      for (let i = 1; i <= 10; i++) {
        if (!this.tables.find(table => table.tableNumber === i.toString())) {
          this.tables.push({ tableNumber: i.toString(), status: 'available', qrCodeUrl: null });
        }
      }

      this.orders = orders.filter(order => !order.completed);
      this.report = report;
    } catch (error) {
      console.error('資料載入失敗:', error);
      throw error;
    }
  }

  /** 獲取未完成訂單 */
  async fetchOrders() {
    try {
      const orders = await this.apiService.get<any[]>(`${this.apiService.getApiUrl()}/qrcodeOrder/orders`);
      this.orders = orders.filter(order => !order.completed);
    } catch (error) {
      console.error('載入訂單失敗:', error);
    }
  }

  /** Socket 監聽 */
  setupSocketListeners() {
    this.socket = io(this.apiService.getApiUrl());
    this.socket.on('connect', () => {
      console.log('WebSocket 已連線');
    });
    this.socket.on('newOrder', (order: any) => {
      console.log('收到新訂單:', order);
      if (!order.completed) {
        this.orders = [...this.orders, order];
        this.openCustomizedModal();
      }
    });
    this.socket.on('disconnect', () => {
      console.log('WebSocket 已斷線');
    });
  }

  /** 開啟新餐點提醒彈窗 */
  openCustomizedModal() {
    this.showNewOrderRemindModal = true;
    setTimeout(() => {
      this.showNewOrderRemindAnimation = true;
    }, 10);
  }

  /** 關閉新餐點提醒彈窗 */
  closeNewOrderRemindModal() {
    this.showNewOrderRemindAnimation = false;
    setTimeout(() => {
      this.showNewOrderRemindModal = false;
    }, 300);
  }

  /** 登出 */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pages/test-api/qrcode-order-login']);
  }
}
