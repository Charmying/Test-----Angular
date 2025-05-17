/** QR Code 點餐系統前台 */

import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApiService } from '../../../../shared/service/api/api.service';
import { Menu } from '../shared/menu/menu-obj';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FormButtonListComponent } from '../../../../shared/components/forms/form-button-list/form-button-list.component';
import { BaseCommonObj } from '../../../../shared/class/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qrcode-order-user-interface',
  standalone: true,
  templateUrl: './qrcode-order-user-interface.component.html',
  styleUrl: './qrcode-order-user-interface.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, ButtonComponent, IconComponent, FormButtonListComponent]
})
export class QRCodeOrderUserInterfaceComponent implements OnInit {
  /** FormGroup */
  form!: FormGroup;
  /** API URL */
  apiUrl = 'http://localhost:4000';
  // apiUrl = 'https://test-express-api-x0j9.onrender.com';
  /** token */
  qrCodeToken!: string;
  /** 桌號 */
  tableNumber: any;
  /** 分類清單 */
  menuCategories: string[] = [];
  /** 根據分類顯示 Menu Items */
  groupedMenuItems: { [category: string]: typeof Menu } = {};
  /** 菜單項目 */
  menuItems = Menu
  /** 客製化彈窗顯示 */
  showCustomized: boolean = false;
  /** 客製化彈窗顯示動畫 */
  customizedAnimation: boolean = false;
  /** 選擇的品項 */
  selectedItem: any = null;
  /** 選擇的可製化 */
  selecteCustomized: any = {};
  /** 當前餐點訂單 */
  currentOrder: any[] = [];
  /** 餐點成功加入訂單訊息 */
  successMessage: string = '';
  /** 顯示餐點成功加入訂單 */
  showSuccessAddToOrder: boolean = false;
  /** 餐點成功加入訂單彈窗顯示動畫 */
  successAddToOrderAnimation: boolean = false;
  /** 餐點成功加入訂單彈窗 timeout 控制 */
  successAddToOrderAnimationTimeout1: any;
  successAddToOrderAnimationTimeout2: any;
  successAddToOrderAnimationTimeout3: any;
  /** 確認當前餐點按鈕顯示動畫 */
  confirmButtonAnimation: boolean = false;
  /** 確認餐點訂單彈窗顯示 */
  showConfirmOrder: boolean = false;
  /** 確認餐點訂單彈窗顯示動畫 */
  confirmOrderAnimation: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder, private viewportScroller: ViewportScroller, private route: ActivatedRoute) {}

  ngOnInit() {
    this.groupedMenuItems = this.menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as { [category: string]: typeof Menu });
  
    // 分類清單
    this.menuCategories = Object.keys(this.groupedMenuItems);

    /** 根據路由取得桌號 */
    this.route.queryParams.subscribe(params => {
      this.tableNumber = params['table'];
      this.qrCodeToken = params['token'];
    });
  }

  // 捲動到分類錨點
  scrollToCategory(category: string) {
    this.viewportScroller.scrollToAnchor(category);
  }

  /** 開啟餐點客製化彈窗 */
  openCustomizedModal(item: any) {
    this.selectedItem = { ...item };

    this.form = this.fb.group({
      spice: [null],
      addons: [[]],
      quantity: [1]
    });

    this.showCustomized = true;
    setTimeout(() => {
      this.customizedAnimation = true;
    }, 10);
  }

  /** 關閉餐點客製化彈窗 */
  closeCustomizedModal() {
    this.customizedAnimation = false;
    setTimeout(() => {
      this.showCustomized = false;
      this.selectedItem = null;
      this.form = null!;
    }, 300);
  }

  /** 獲取辣度選項 */
  get spiceOptions(): BaseCommonObj[] {
    return this.selectedItem?.spiceOptions?.map((option: string) => ({ id: option, name: option })) || [];
  }

  /** 獲取加料選項 */
  get addonOptions(): BaseCommonObj[] {
    return this.selectedItem?.addonOptions?.map((option: string) => ({ id: option, name: option })) || [];
  }

  /** 減少數量 */
  decreaseQuantity() {
    const quantityControl = this.form.get('quantity');
    if (quantityControl && quantityControl.value > 1) {
      quantityControl.setValue(quantityControl.value - 1);
    }
  }
  
  /** 增加數量 */
  increaseQuantity() {
    const quantityControl = this.form.get('quantity');
    if (quantityControl) {
      quantityControl.setValue(quantityControl.value + 1);
    }
  }

  /** 餐點加入訂單 */
  addToOrder() {
    if (!this.selectedItem) return;

    const spice = this.form.get('spice')?.value;
    const addons = this.form.get('addons')?.value || [];
    const quantity = this.form.get('quantity')?.value || 1;

    const customizedItem = {
      name: this.selectedItem.name,
      price: this.selectedItem.price,
      quantity: quantity,
      spice: spice,
      addons: addons
    };

    const existingItem = this.currentOrder.find(orderItem =>
      orderItem.name === customizedItem.name && orderItem.spice === customizedItem.spice && JSON.stringify(orderItem.addons.sort()) === JSON.stringify(customizedItem.addons.sort())
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.currentOrder.push(customizedItem);
    }

    this.showToast(`成功加入 ${customizedItem.name} x ${quantity}！`);
    console.log('this.currentOrder:', this.currentOrder)
    this.closeCustomizedModal();

    if (!this.confirmButtonAnimation) {
      setTimeout(() => {
        this.confirmButtonAnimation = true;
      }, 10);
    }
  }

  /** 顯示餐點加入訂單 Toast */
  showToast(message: string) {
    this.successMessage = message;

    clearTimeout(this.successAddToOrderAnimationTimeout1);
    clearTimeout(this.successAddToOrderAnimationTimeout2);
    clearTimeout(this.successAddToOrderAnimationTimeout3);

    this.showSuccessAddToOrder = true;
    this.successAddToOrderAnimation = false;

    this.successAddToOrderAnimationTimeout1 = setTimeout(() => {
      this.successAddToOrderAnimation = true;
    }, 10);

    this.successAddToOrderAnimationTimeout2 = setTimeout(() => {
      this.successAddToOrderAnimation = false;
    }, 1700);

    this.successAddToOrderAnimationTimeout3 = setTimeout(() => {
      this.showSuccessAddToOrder = false;
    }, 2000);
  }

  /** 開啟餐點訂單彈窗 */
  openConfirmModal(): void {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }
    this.showConfirmOrder = true;
    setTimeout(() => {
      this.confirmOrderAnimation = true;
    }, 10);
  }

  /** 關閉餐點訂單彈窗 */
  closeConfirmModal(): void {
    this.confirmOrderAnimation = false;
    setTimeout(() => {
      this.showConfirmOrder = false;
    }, 300);
  }

  /** 取得全部餐點訂單數量 */
  get totalQuantity(): number {
    return this.currentOrder.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 取得確認餐點總金額 */
  get totalAmount(): number {
    return this.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /** 確認餐點訂單中增加餐點份量功能 */
  increaseItemQuantity(item: any) {
    item.quantity += 1;
  }

  /** 確認餐點訂單中減少餐點份量功能 */
  decreaseItemQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item);
    }
  }

  /** 確認餐點訂單中移除餐點功能 */
  removeItem(item: any) {
    const index = this.currentOrder.indexOf(item);
    if (index > -1) {
      this.currentOrder.splice(index, 1);
    }

    if (this.currentOrder.length === 0) {
      this.confirmButtonAnimation = false;
      this.closeConfirmModal();
    }
  }

  /** 提交餐點訂單 */
  async submitOrder() {
    if (!this.currentOrder.length) {
      alert('請先加入餐點！');
      return;
    }

    if (!this.tableNumber || !this.qrCodeToken) {
      alert('桌號或連結錯誤，請重新掃碼！');
      return;
    }

    const orderData = {
      tableNumber: this.tableNumber,
      token: this.qrCodeToken,
      items: this.currentOrder.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        spice: item.spice,
        addons: item.addons
      }))
    };

    console.log('orderData', orderData)

    try {
      await this.apiService.post<any>(`${this.apiUrl}/qrcodeOrder/orders`, orderData);
      alert('訂單已提交！');
      this.currentOrder = [];
      this.closeConfirmModal();
      this.confirmButtonAnimation = false;
    } catch (error) {
      console.error('提交訂單失敗:', error);
      alert('提交訂單失敗，請稍後再試！');
    }
  }
}
