import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ApiService } from '../../../shared/service/api/api.service';
import { finalize, tap } from 'rxjs'; // 使用 RxJS 的 tap 和 finalize 方法時需要
import { forkJoin } from 'rxjs'; // 使用 forkJoin 方法時需要

@Component({
  selector: 'app-test1-and-test2-api-page',
  standalone: true,
  templateUrl: './test1-and-test2-api-page.component.html',
  styleUrl: './test1-and-test2-api-page.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, ButtonComponent]
})
export class Test1AndTest2ApiPageComponent implements OnInit {
  // apiUrl1: string = 'https://test-express-api-x0j9.onrender.com/test1';
  // apiUrl2: string = 'https://test-express-api-x0j9.onrender.com/test2';
  // data1: any;
  // data2: any;
  // allData: any;
  // isLoading = true;

  // constructor(private apiService: ApiService) {}

  /**
   * 使用 async await 方法
   * 使用 getData
   * 需要 return Promise<any>
   */
  // async ngOnInit() {
  //   try {
  //     this.data1 = await this.apiService.getData(this.apiUrl1);
  //     this.data2 = await this.apiService.getData(this.apiUrl2);

  //     this.allData = [...this.data1, ...this.data2];
  //   } catch (err) {
  //     console.error('獲取資料時發生錯誤:', err);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  /** ==================================================================================================== */

  /**
   * 使用 async await 方法
   * 使用 getTest1Data getTest2Data
   * 需要 return Promise<any>
   */
  // async ngOnInit() {
  //   try {
  //     this.data1 = await this.apiService.getTest1Data();
  //     this.data2 = await this.apiService.getTest2Data();

  //     this.allData = [...this.data1, ...this.data2];
  //   } catch (err) {
  //     console.error('獲取資料時發生錯誤:', err);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  /** ==================================================================================================== */

  /**
   * 使用 subscribe 的 next 方法
   * 使用 getData
   * 需要 return Observable<any>
   */
  // ngOnInit() {
  //   this.apiService.getTest1Data().subscribe({
  //     next: (response) => {
  //       this.data1 = response;
  //       this.checkDataComplete();
  //     },
  //     error: (err) => console.error('獲取 test1 資料時發生錯誤:', err)
  //   });

  //   this.apiService.getTest2Data().subscribe({
  //     next: (response) => {
  //       this.data2 = response;
  //       this.checkDataComplete();
  //     },
  //     error: (err) => console.error('獲取 test2 資料時發生錯誤:', err)
  //   });
  // }

  // checkDataComplete() {
  //   if (this.data1 && this.data2) {
  //     this.allData = [...this.data1, ...this.data2];
  //     this.isLoading = false;
  //   }
  // }

  /** ==================================================================================================== */

  /**
   * 使用 RxJS 的 tap 和 finalize 方法
   * 使用 getData
   * 需要 return Observable<any>
   */
  // ngOnInit() {
  //   this.apiService.getTest1Data()
  //     .pipe(
  //       tap((response) => this.data1 = response),
  //       finalize(() => this.checkDataComplete())
  //     )
  //     .subscribe({
  //       error: (err) => console.error('獲取 test1 資料時發生錯誤:', err)
  //     });

  //   this.apiService.getTest2Data()
  //     .pipe(
  //       tap((response) => this.data2 = response),
  //       finalize(() => this.checkDataComplete())
  //     )
  //     .subscribe({
  //       error: (err) => console.error('獲取 test2 資料時發生錯誤:', err)
  //     });
  // }

  // checkDataComplete() {
  //   if (this.data1 && this.data2) {
  //     this.allData = [...this.data1, ...this.data2];
  //     this.isLoading = false;
  //   }
  // }

  /** ==================================================================================================== */

  /**
   * 使用 forkJoin 方法
   * 使用 getData
   * 可以 return Promise<any> 或 return Observable<any>
   */
  // ngOnInit() {
  //   forkJoin({
  //     data1: this.apiService.getTest1Data(),
  //     data2: this.apiService.getTest2Data()
  //   }).subscribe({
  //     next: (response) => {
  //       this.data1 = response.data1;
  //       this.data2 = response.data2;
  //       this.allData = [...this.data1, ...this.data2];
  //     },
  //     error: (err) => console.error('獲取資料時發生錯誤:', err),
  //     complete: () => this.isLoading = false
  //   });
  // }

  /** ==================================================================================================== */

  /** API 網址 */
  apiUrl: string = 'https://test-express-api-x0j9.onrender.com';
  /** 預設顯示 test1 */
  currentDatabase = 'test1';
  /** 表格資料 */
  data: any[] = [];
  /** 判斷是否載入完成 */
  isLoading = true;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.fetchData();
  }

  /** 取得 API 資料 */
  async fetchData() {
    this.isLoading = true;
    try {
      this.data = await this.apiService.get(`${this.apiUrl}/${this.currentDatabase}`);
    } finally {
      this.isLoading = false;
    }
  }

  /** 按鈕 click 事件切換 test1 & test2 */
  switchDatabase(database: string) {
    this.currentDatabase = database;
    this.fetchData();
  }
}