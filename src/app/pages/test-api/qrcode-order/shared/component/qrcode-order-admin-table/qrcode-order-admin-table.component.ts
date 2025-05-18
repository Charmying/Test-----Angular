import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../../shared/service/api/api.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-qrcode-order-admin-table',
  standalone: true,
  templateUrl: './qrcode-order-admin-table.component.html',
  styleUrl: './qrcode-order-admin-table.component.scss',
  imports: [CommonModule, ButtonComponent],
})
export class QRCodeOrderAdminTableComponent {
  /** 桌號資訊 */
  @Input() tables!: any[];

  constructor(private apiService: ApiService) {}

  /** 標示桌號有人 */
  async occupyTable(tableNumber: string) {
    try {
      const response = await this.apiService.post<any>(`${this.apiService.getApiUrl()}/qrcodeOrder/tables/${tableNumber}/occupy`, {});
      this.tables = this.tables.map(table =>
        table.tableNumber === tableNumber? { ...table, status: 'occupied', qrCodeUrl: response.qrCodeUrl, qrCodeToken: response.token } : table
      );
    } catch (error) {
      console.error('標示桌號有人失敗:', error);
      alert('標示桌號有人失敗，請稍後再試');
    }
  }

  /** 結帳並使 QR Code 失效 */
  async checkoutTable(tableNumber: string) {
    try {
      const response = await this.apiService.post<any>(`${this.apiService.getApiUrl()}/qrcodeOrder/tables/${tableNumber}/checkout`, {});
      this.tables = this.tables.map(table => 
        table.tableNumber === tableNumber ? { ...table, status: 'available', qrCodeUrl: null, qrCodeToken: null } : table
      );
    } catch (error) {
      console.error('結帳失敗:', error);
      alert('結帳失敗，請稍後再試');
    }
  }
}
