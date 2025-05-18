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

  constructor(private apiService: ApiService) {}

  /** 計算訂單總額 */
  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
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
