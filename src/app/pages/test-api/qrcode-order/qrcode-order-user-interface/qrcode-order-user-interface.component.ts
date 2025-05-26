/** QR Code 點餐系統前台 */

import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../shared/service/api/api.service';
import { Menu } from '../shared/menu/menu-obj';
import { BaseCommonObj } from '../../../../shared/class/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FormButtonListComponent } from '../../../../shared/components/forms/form-button-list/form-button-list.component';

/** 菜單項目介面 */
interface MenuItem {
  name: string;
  price: number;
  category: string;
  photo: string;
  spiceOptions?: string[];
  addonOptions?: string[];
}

/** 訂單項目介面 */
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  spice?: string;
  addons: string[];
}

@Component({
  selector: 'app-qrcode-order-user-interface',
  standalone: true,
  templateUrl: './qrcode-order-user-interface.component.html',
  styleUrl: './qrcode-order-user-interface.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    TestApiHeaderComponent,
    SectionComponent,
    ButtonComponent,
    IconComponent,
    FormButtonListComponent,
  ],
})
export class QRCodeOrderUserInterfaceComponent implements OnInit {
  /** 客製化表單 */
  form!: FormGroup;
  /** API 基礎 URL */
  apiUrl: string;
  /** QR Code 認證 token */
  qrCodeToken: string = '';
  /** 桌號 */
  tableNumber: string = '';
  /** 菜單分類清單 */
  menuCategories: string[] = [];
  /** 按分類分組的菜單項目 */
  groupedMenuItems: { [category: string]: MenuItem[] } = {};
  /** 靜態菜單數據 */
  private menuItems = Menu;
  /** 客製化彈窗顯示狀態 */
  showCustomized = false;
  /** 客製化彈窗動畫狀態 */
  customizedAnimation = false;
  /** 當前選擇的菜單項目 */
  selectedItem?: MenuItem;
  /** 當前訂單項目 */
  currentOrder: OrderItem[] = [];
  /** 確認訂單彈窗顯示狀態 */
  showConfirmOrder = false;
  /** 確認訂單彈窗動畫狀態 */
  confirmOrderAnimation = false;
  /** 確認按鈕動畫狀態 */
  confirmButtonAnimation = false;
  /** 正在提交訂單提示顯示狀態 */
  showSubmittingOrder = false;
  /** 正在提交訂單提示動畫狀態 */
  submittingOrderAnimation = false;
  /** 提交訂單按鈕禁用狀態 */
  isSubmitting = false;

  /** Toast 提示狀態 */
  toastState = {
    message: '',
    isVisible: false,
    animation: false,
    timeoutIds: [] as NodeJS.Timeout[],
  };

  /** 動畫時間常數（毫秒） */
  readonly ANIMATION = {
    TOAST_FADE_IN: 10,
    TOAST_DISPLAY: 1700,
    TOAST_FADE_OUT: 2000,
    MODAL_TRANSITION: 300,
    MIN_SUBMIT_DISPLAY: 1000,
  };

  constructor(private apiService: ApiService, private fb: FormBuilder, private viewportScroller: ViewportScroller, private route: ActivatedRoute) {
    this.apiUrl = this.apiService.getApiUrl();
  }

  /** 初始化組件，載入菜單和路由參數 */
  ngOnInit(): void {
    // 分組菜單項目
    this.groupedMenuItems = this.menuItems.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {} as { [category: string]: MenuItem[] });

    // 設定菜單分類
    this.menuCategories = Object.keys(this.groupedMenuItems);

    // 從路由參數取得桌號和 token
    this.route.queryParams.subscribe(params => {
      this.tableNumber = params['table'] || '';
      this.qrCodeToken = params['token'] || '';
    });
  }

  /** 捲動到指定菜單分類 */
  scrollToCategory(category: string): void {
    this.viewportScroller.scrollToAnchor(category);
  }

  /** 開啟客製化彈窗並初始化表單 */
  openCustomizedModal(item: MenuItem): void {
    this.selectedItem = { ...item };
    this.form = this.fb.group({
      spice: [null],
      addons: [[]],
      quantity: [1],
    });
    this.showCustomized = true;
    setTimeout(() => (this.customizedAnimation = true), this.ANIMATION.TOAST_FADE_IN);
  }

  /** 關閉客製化彈窗並重置狀態 */
  closeCustomizedModal(): void {
    this.customizedAnimation = false;
    setTimeout(() => {
      this.showCustomized = false;
      this.selectedItem = undefined;
    }, this.ANIMATION.MODAL_TRANSITION);
  }

  /** 取得辣度選項 */
  get spiceOptions(): BaseCommonObj[] {
    return (
      this.selectedItem?.spiceOptions?.map(option => ({ id: option, name: option })) || []
    );
  }

  /** 取得加料選項 */
  get addonOptions(): BaseCommonObj[] {
    return (
      this.selectedItem?.addonOptions?.map(option => ({ id: option, name: option })) || []
    );
  }

  /** 減少客製化表單中的數量 */
  decreaseQuantity(): void {
    const quantity = this.form?.get('quantity')?.value;
    if (quantity && quantity > 1) {
      this.form?.get('quantity')?.setValue(quantity - 1);
    }
  }

  /** 增加客製化表單中的數量 */
  increaseQuantity(): void {
    const quantity = this.form?.get('quantity')?.value;
    if (quantity) {
      this.form?.get('quantity')?.setValue(quantity + 1);
    }
  }

  /** 將客製化項目加入訂單 */
  addToOrder(): void {
    if (!this.selectedItem) return;

    const { spice, addons, quantity } = this.form!.value;
    const newItem: OrderItem = {
      name: this.selectedItem.name,
      price: this.selectedItem.price,
      quantity: quantity || 1,
      spice: spice || undefined,
      addons: addons || [],
    };

    // 檢查是否已有相同項目（名稱、辣度、加料一致）
    const existingItem = this.currentOrder.find(
      item =>
        item.name === newItem.name &&
        item.spice === newItem.spice &&
        item.addons.sort().join(',') === newItem.addons.sort().join(',')
    );

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      this.currentOrder.push(newItem);
    }

    this.showToast(`成功加入 ${newItem.name} x ${newItem.quantity}！`);
    this.closeCustomizedModal();

    // 顯示確認按鈕動畫
    if (!this.confirmButtonAnimation) {
      setTimeout(
        () => (this.confirmButtonAnimation = true),
        this.ANIMATION.TOAST_FADE_IN
      );
    }
  }

  /** 顯示 Toast 提示（用於成功或錯誤訊息） */
  showToast(message: string): void {
    // 清除現有計時器
    this.toastState.timeoutIds.forEach(clearTimeout);
    this.toastState.timeoutIds = [];

    // 更新 Toast 狀態
    this.toastState.message = message;
    this.toastState.isVisible = true;
    this.toastState.animation = false;

    // 設定動畫計時器
    this.toastState.timeoutIds.push(
      setTimeout(
        () => (this.toastState.animation = true),
        this.ANIMATION.TOAST_FADE_IN
      ),
      setTimeout(
        () => (this.toastState.animation = false),
        this.ANIMATION.TOAST_DISPLAY
      ),
      setTimeout(
        () => (this.toastState.isVisible = false),
        this.ANIMATION.TOAST_FADE_OUT
      )
    );
  }

  /** 開啟確認訂單彈窗 */
  openConfirmModal(): void {
    if (!this.currentOrder.length) {
      this.showToast('請先加入餐點！');
      return;
    }
    this.showConfirmOrder = true;
    setTimeout(
      () => (this.confirmOrderAnimation = true),
      this.ANIMATION.TOAST_FADE_IN
    );
  }

  /** 關閉確認訂單彈窗 */
  closeConfirmModal(): void {
    this.confirmOrderAnimation = false;
    setTimeout(
      () => (this.showConfirmOrder = false),
      this.ANIMATION.MODAL_TRANSITION
    );
  }

  /** 計算訂單總數量 */
  get totalQuantity(): number {
    return this.currentOrder.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 計算訂單總金額 */
  get totalAmount(): number {
    return this.currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /** 增加確認訂單中項目的數量 */
  increaseItemQuantity(item: OrderItem): void {
    item.quantity += 1;
  }

  /** 減少確認訂單中項目的數量 */
  decreaseItemQuantity(item: OrderItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(item);
    }
  }

  /** 移除確認訂單中的項目 */
  removeItem(item: OrderItem): void {
    const index = this.currentOrder.indexOf(item);
    if (index > -1) {
      this.currentOrder.splice(index, 1);
    }

    if (!this.currentOrder.length) {
      this.confirmButtonAnimation = false;
      this.closeConfirmModal();
    }
  }

  /** 提交訂單到後端 */
  async submitOrder(): Promise<void> {
    // 檢查是否正在提交或訂單為空
    if (!this.currentOrder.length) {
      this.showToast('請先加入餐點！');
      return;
    }

    // 驗證桌號和 token
    if (!this.tableNumber || !this.qrCodeToken) {
      this.showToast('桌號或連結錯誤，請重新掃碼！');
      return;
    }

    this.isSubmitting = true;

    const orderData = {
      tableNumber: this.tableNumber,
      token: this.qrCodeToken,
      items: this.currentOrder,
    };

    try {
      this.showSubmittingOrder = true;
      setTimeout(
        () => (this.submittingOrderAnimation = true),
        this.ANIMATION.TOAST_FADE_IN
      );

      // 記錄開始時間
      const startTime = Date.now();

      // 並行執行 API 請求和最小顯示時間
      await Promise.all([
        this.apiService.post<any>(`${this.apiUrl}/qrcodeOrder/orders`, orderData),
        new Promise(resolve => setTimeout(resolve, this.ANIMATION.MIN_SUBMIT_DISPLAY)),
      ]);

      // 計算剩餘等待時間，確保最小顯示時間
      const elapsedTime = Date.now() - startTime;
      const remainingTime = this.ANIMATION.MIN_SUBMIT_DISPLAY - elapsedTime;
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      // 關閉提交提示
      this.submittingOrderAnimation = false;
      setTimeout(
        () => (this.showSubmittingOrder = false),
        this.ANIMATION.MODAL_TRANSITION
      );

      // 顯示成功提示
      this.showToast('✅ 餐點成功提交！');

      // 重置訂單狀態
      this.currentOrder = [];
      this.closeConfirmModal();
      this.confirmButtonAnimation = false;
    } catch (error) {
      console.error('提交訂單失敗:', error);
      this.submittingOrderAnimation = false;
      setTimeout(
        () => (this.showSubmittingOrder = false),
        this.ANIMATION.MODAL_TRANSITION
      );
      this.showToast('提交訂單失敗，請稍後再試！');
    } finally {
      this.isSubmitting = false;
    }
  }
}