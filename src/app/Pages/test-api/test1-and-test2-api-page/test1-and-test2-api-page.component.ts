import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ApiService } from '../../../shared/service/api/api.service';
import { finalize, tap } from 'rxjs'; // 使用 RxJS 的 tap 和 finalize 方法時需要
import { forkJoin } from 'rxjs'; // 使用 forkJoin 方法時需要
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormInputTextComponent } from '../../../shared/components/forms/form-input-text/form-input-text.component';
import { FormInputPasswordComponent } from '../../../shared/components/forms/form-input-password/form-input-password.component';

@Component({
  selector: 'app-test1-and-test2-api-page',
  standalone: true,
  templateUrl: './test1-and-test2-api-page.component.html',
  styleUrl: './test1-and-test2-api-page.component.scss',
  imports: [CommonModule, HeaderComponent, TestApiHeaderComponent, SectionComponent, ButtonComponent, FormInputTextComponent, FormInputPasswordComponent]
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

  /** FormGroup */
  form: FormGroup;
  /** 控制表單是否顯示 */
  isShowForm = false;
  /** API URL */
  apiUrl = 'https://test-express-api-x0j9.onrender.com';
  /** 當前資料庫 */
  currentDatabase = 'test1';
  /** 表格資料 */
  data: Record[] = [];
  /** 載入狀態 */
  isLoading = true;
  /** 當前編輯的記錄 ID */
  recordId = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      userName: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  /** 獲取資料庫資料 */
  async fetchData() {
    this.isLoading = true;
    try {
      this.data = await this.apiService.get<Record[]>(`${this.apiUrl}/${this.currentDatabase}`);
    } catch (error) {
      console.error('資料載入失敗:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /** 切換資料庫並重新載入資料 */
  switchDatabase(database: string) {
    this.currentDatabase = database;
    this.fetchData();
    this.clearForm();
  }

  /** 顯示表單 */
  showForm() {
    this.isShowForm = true;
  }

  /** 處理表單提交 (新增 & 刪除) */
  async handleSubmit() {
    const url = this.recordId ? `${this.apiUrl}/${this.currentDatabase}/${this.recordId}` : `${this.apiUrl}/${this.currentDatabase}`;
    try {
      const result = await (this.recordId ? this.apiService.put<ApiResponse>(url, this.form.value) : this.apiService.post<ApiResponse>(url, this.form.value));
      if (this.recordId) {
        const updatedRecord = (result as ApiResponse).data;
        const index = this.data.findIndex(item => item._id === this.recordId);
        if (index !== -1) this.data[index] = updatedRecord;
      } else {
        const newRecord = (result as ApiResponse).data;
        this.data.push(newRecord);
        console.log(this.data);
      }
      this.clearForm();
    } catch (error) {
      console.error('提交失敗:', error);
    }
  }
  

  /** 編輯指定資料 */
  async editData(id: string) {
    try {
      const data = await this.apiService.get<Record>(`${this.apiUrl}/${this.currentDatabase}/${id}`);
      this.recordId = data._id!;
      this.form.patchValue(data);
      this.isShowForm = true;
    } catch (error) {
      console.error('載入編輯資料失敗:', error);
    }
  }

  /** 刪除指定資料 */
  async deleteData(id: string) {
    if (confirm('確定要刪除嗎？')) {
      try {
        await this.apiService.delete(`${this.apiUrl}/${this.currentDatabase}/${id}`);
        this.data = this.data.filter(item => item._id !== id);
      } catch (error) {
        console.error('刪除失敗:', error);
      }
    }
  }

/** 清空表單 */
  clearForm() {
    this.form.reset();
    this.recordId = '';
  }

  /** 清空表單並隱藏 */
  goBack() {
    this.form.reset();
    this.recordId = '';
    this.isShowForm = false;
  }
}

interface Record {
  id: string;
  userName: string;
  email: string;
  password: string;
  _id: string;
  __v?: number;
}

interface ApiResponse {
  message: string;
  data: Record;
}
