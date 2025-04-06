import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * return 的是 Promise<any>
   * async await 方法
   */
  constructor(private http: HttpClient) {}

  // 封裝 GET 請求
  async getData(url: string): Promise<any> {
    try {
      return await firstValueFrom(this.http.get(url));
    } catch (err) {
      throw err;
    }
  }

  /** 直接取 test1 api */
  async getTest1Data(): Promise<any> {
    return this.getData('https://test-express-api-x0j9.onrender.com/test1');
  }

  /** 直接取 test2 api */
  async getTest2Data(): Promise<any> {
    return this.getData('https://test-express-api-x0j9.onrender.com/test2');
  }

  /** ==================================================================================================== */

  /**
   * return 的是 Observable<any>
   * subscribe 的 next 方法
   */
  // constructor(private http: HttpClient) {}

  // // 封裝 GET 請求
  // getData(url: string): Observable<any> {
  //   return this.http.get(url);
  // }

  // /** 直接取 test1 api */
  // getTest1Data(): Observable<any> {
  //   return this.getData('https://test-express-api-x0j9.onrender.com/test1');
  // }

  // /** 直接取 test2 api */
  // getTest2Data(): Observable<any> {
  //   return this.getData('https://test-express-api-x0j9.onrender.com/test2');
  // }
}
