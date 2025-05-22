import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../../../../shared/service/api/api.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { FormButtonListComponent } from '../../../../../../shared/components/forms/form-button-list/form-button-list.component';
import { BaseCommonObj } from '../../../../../../shared/class/common';

@Component({
  selector: 'app-qrcode-order-admin-report',
  standalone: true,
  templateUrl: './qrcode-order-admin-report.component.html',
  styleUrl: './qrcode-order-admin-report.component.scss',
  imports: [CommonModule, ButtonComponent, FormButtonListComponent],
})
export class QRCodeOrderAdminReportComponent implements OnInit {
  /** 營業報表 */
  @Input() report!: {
    totalRevenue: number;
    completedOrders: Order[];
  };
  /** FormGroup */
  form!: FormGroup;
  /** 下拉或按鈕資料 */
  periodOptions: BaseCommonObj[] = [
    { id: 'all', name: '全部訂單統整' },
    { id: 'today', name: '本日訂單統整' },
    { id: 'yesterday', name: '昨日訂單統整' },
    { id: 'week', name: '本週訂單統整' },
    { id: 'month', name: '本月訂單統整' }
  ];
  /** 預設顯示每桌報表 */
  viewLabel = '全部';

  constructor(private apiService: ApiService, private fb: FormBuilder,) {
    this.form = this.fb.group({
      viewMode: ['all']
    });
  }

  ngOnInit() {
    this.form.get('viewMode')!.valueChanges.subscribe((mode: ViewMode) => {
      this.updateViewLabel(mode);
    });

    this.updateViewLabel(this.form.get('viewMode')!.value);
  }

  /** 更新目前顯示文字 */
  private updateViewLabel(mode: ViewMode) {
    const map: Record<ViewMode, string> = {
      all: '全部統整',
      today: '本日統整',
      yesterday: '昨日統整',
      week: '本週統整',
      month: '本月統整'
    };
    this.viewLabel = map[mode] || '全部統整';
  }

  /** 解析 YYYYMMDD 到當地零點 Date */
  private parseDateString(s: string): Date {
    const y = +s.slice(0, 4);
    const m = +s.slice(4, 6) - 1;
    const d = +s.slice(6, 8);
    return new Date(y, m, d);
  }

  /** 取當地零點，用於計算區間 */
  private getStartOfDay(offset: number): Date {
    const dt = new Date();
    dt.setHours(0, 0, 0, 0);
    dt.setDate(dt.getDate() + offset);
    return dt;
  }

  /** 取得過濾後的完成訂單 */
  private getFilteredOrders(): Order[] {
    const mode: ViewMode = this.form.get('viewMode')!.value;
    if (mode === 'all') return this.report.completedOrders;

    let start: Date, end: Date;
    switch (mode) {
      case 'today':
        start = this.getStartOfDay(0);
        end   = this.getStartOfDay(1);
        break;
      case 'yesterday':
        start = this.getStartOfDay(-1);
        end   = this.getStartOfDay(0);
        break;
      case 'week':
        start = this.getStartOfDay(-6);
        end   = this.getStartOfDay(1);
        break;
      case 'month':
        start = this.getStartOfDay(0);
        start.setDate(1);
        end   = this.getStartOfDay(1);
        break;
      default:
        return [];
    }
    return this.report.completedOrders.filter(o => {
      const dt = this.parseDateString(o.createdAt);
      return dt >= start && dt < end;
    });
  }

  /** 合併相同品項 */
  getConsolidatedItems() {
    const map: Record<string, any> = {};
    this.getFilteredOrders().forEach(order => {
      order.items.forEach(item => {
        const key = `${item.name}-${item.spice || ''}-${item.addons?.sort().join(',') || ''}`;
        if (!map[key]) {
          map[key] = { name: item.name, quantity: 0, totalPrice: 0, spice: item.spice, addons: item.addons };
        }
        map[key].quantity   += item.quantity;
        map[key].totalPrice += item.quantity * item.price;
      });
    });
    return Object.values(map);
  }

  /** 過濾後總收入 */
  get filteredTotalRevenue(): number {
    return this.getFilteredOrders()
      .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0), 0);
  }

  /** 清空資料庫 */
  async clearDatabase() {
    if (!confirm('確定要清空資料庫嗎？此操作無法復原！')) return;
    try {
      await this.apiService.delete(`${this.apiService.getApiUrl()}/qrcodeOrder/clear`);
      this.report = { totalRevenue: 0, completedOrders: [] };
      alert('資料庫已清空');
    } catch (err) {
      console.error(err);
      alert('清空失敗');
    }
  }
}

// 可選篩選模式
type ViewMode = 'all' | 'today' | 'yesterday' | 'week' | 'month';

interface Order {
  tableNumber: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    spice?: string;
    addons?: string[];
  }>;
  createdAt: string;
}
