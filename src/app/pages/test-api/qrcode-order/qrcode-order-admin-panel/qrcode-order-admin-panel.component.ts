/** QR Code 點餐系統後台 */

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../../shared/service/api/api.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { QRCodeOrderAdminTableComponent } from '../shared/component/qrcode-order-admin-table/qrcode-order-admin-table.component';
import { QRCodeOrderAdminOrderComponent } from '../shared/component/qrcode-order-admin-order/qrcode-order-admin-order.component';
import { QRCodeOrderAdminReportComponent } from '../shared/component/qrcode-order-admin-report/qrcode-order-admin-report.component';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-qrcode-order-admin-panel',
  standalone: true,
  templateUrl: './qrcode-order-admin-panel.component.html',
  styleUrl: './qrcode-order-admin-panel.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, QRCodeOrderAdminTableComponent, QRCodeOrderAdminOrderComponent, QRCodeOrderAdminReportComponent, ButtonComponent]
})
export class QRCodeOrderAdminPanelComponent {
  /** 選擇顯示子層 component (預設) */
  options = '桌號資訊'
  /** 桌號資訊 */
  tables: any[] = [];
  /** socket */
  private socket: any;
  /** 待處理訂單 */
  orders: any[] = [];
  /** 新餐點提醒彈窗顯示 */
  showNewOrderRemindModal = false;
  /** 新餐點提醒彈窗顯示動畫 */
  showNewOrderRemindAnimation: boolean = false;
  /** 營業報表 */
  report: any = null;

  /** 子層 component */
  links: any[] = [
    { title: '桌號資訊' },
    { title: '點餐狀況' },
    { title: '營業報表' },
  ]

  /** 切換預顯示 component */
  changeOptions(title: string) {
    this.options = title
  }

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.fetchTables();
    if (isPlatformBrowser(this.platformId)) {
      this.setupSocketListeners();
    }
    this.fetchOrders();
    this.generateReport();
  }

  /** 獲取桌號資料 */
  async fetchTables() {
    try {
      this.tables = await this.apiService.get<any[]>(`${this.apiService.getApiUrl()}/qrcodeOrder/tables`);
      // 共 10 桌
      for (let i = 1; i <= 10; i++) {
        if (!this.tables.find(table => table.tableNumber === i.toString())) {
          this.tables.push({ tableNumber: i.toString(), status: 'available', qrCodeUrl: null });
        }
      }
    } catch (error) {
      console.error('桌號載入失敗:', error);
    }
  }

  /** Socket 監聽 */
  setupSocketListeners() {
    this.socket = io(this.apiService.getApiUrl());
    this.socket.on('newOrder', (order: any) => {
      this.orders.push(order);
      this.openCustomizedModal()
    });
  }

  /** 開啟 */
  openCustomizedModal() {
    this.showNewOrderRemindModal = true;
    setTimeout(() => {
      this.showNewOrderRemindAnimation = true;
    }, 10);
  }

  /** 關閉 */
  closeNewOrderRemindModal() {
    this.showNewOrderRemindAnimation = false;
    setTimeout(() => {
      this.showNewOrderRemindModal = false;
    }, 300);
  }

  /** 獲取訂單資料 */
  async fetchOrders() {
    try {
      this.orders = await this.apiService.get<any[]>(`${this.apiService.getApiUrl()}/qrcodeOrder/orders`);
    } catch (error) {
      console.error('訂單載入失敗:', error);
    }
  }

  /** 生成營業報表 */
  async generateReport() {
    try {
      this.report = await this.apiService.get<any>(`${this.apiService.getApiUrl()}/qrcodeOrder/reports`);
    } catch (error) {
      console.error('生成報表失敗:', error);
    }
  }
}
