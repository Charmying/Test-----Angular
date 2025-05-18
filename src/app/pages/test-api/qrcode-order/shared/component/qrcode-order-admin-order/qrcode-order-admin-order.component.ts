import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../../shared/service/api/api.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-qrcode-order-admin-order',
  standalone: true,
  templateUrl: './qrcode-order-admin-order.component.html',
  styleUrl: './qrcode-order-admin-order.component.scss',
  imports: [CommonModule, ButtonComponent],
})
export class QRCodeOrderAdminOrderComponent {
  /** 待處理訂單 */
  @Input() orders: any[] = [];

  constructor(private apiService: ApiService) {}

  /** 計算訂單總額 */
  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }

  /** 標記訂單完成 */
  async completeOrder(id: string) {
    try {
      await this.apiService.put<any>(`${this.apiService.getApiUrl()}/qrcodeOrder/orders/${id}/complete`, {});
      this.orders = this.orders.filter(order => order._id !== id);
    } catch (error) {
      console.error('更新訂單狀態失敗:', error);
    }
  }
}
