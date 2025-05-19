import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../../shared/service/api/api.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-qrcode-order-admin-report',
  standalone: true,
  templateUrl: './qrcode-order-admin-report.component.html',
  styleUrl: './qrcode-order-admin-report.component.scss',
  imports: [CommonModule, ButtonComponent],
})
export class QRCodeOrderAdminReportComponent {
  /** 營業報表 */
  @Input() report!: any;
  /** 預設顯示每桌報表 */
  viewMode: ViewMode = 'table';

  constructor(private apiService: ApiService) {}

  /** 切換模式 */
  setView(mode: ViewMode) {
    this.viewMode = mode;
  }

  /** 計算訂單總額 */
  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }

  /** 獲取每個桌號的訂單詳情 */
  getTableOrders() {
    const tableMap: { [key: string]: any } = {};

    this.report.completedOrders.forEach((order: any) => {
      if (!tableMap[order.tableNumber]) {
        tableMap[order.tableNumber] = {
          tableNumber: order.tableNumber,
          items: [],
          total: 0,
        };
      }
      order.items.forEach((item: any) => {
        tableMap[order.tableNumber].items.push(item);
      });
      tableMap[order.tableNumber].total = this.getOrderTotal(tableMap[order.tableNumber]);
    });

    return Object.values(tableMap);
  }

  /** 統整所有訂單中的相同餐點項目 */
  getConsolidatedItems(): ConsolidatedItem[] {
    const itemMap: { [key: string]: ConsolidatedItem } = {};

    this.report.completedOrders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        const key = `${item.name}-${item.spice || ''}-${item.addons?.sort().join(',') || ''}`;
        if (!itemMap[key]) {
          itemMap[key] = {
            name: item.name,
            quantity: 0,
            totalPrice: 0,
            spice: item.spice,
            addons: item.addons,
          };
        }
        itemMap[key].quantity += item.quantity;
        itemMap[key].totalPrice += item.price * item.quantity;
      });
    });

    return Object.values(itemMap);
  }

  /** 清空資料庫 */
  async clearDatabase() {
    if (confirm('確定要清空資料庫嗎？此操作無法復原！')) {
      try {
        await this.apiService.delete(`${this.apiService.getApiUrl()}/qrcodeOrder/clear`);
        this.report = null;
        alert('資料庫已清空');
      } catch (error) {
        console.error('清空資料庫失敗:', error);
      }
    }
  }
}

type ViewMode = 'table' | 'consolidated';

interface ConsolidatedItem {
  name: string;
  quantity: number;
  totalPrice: number;
  spice?: string;
  addons?: string[];
}
