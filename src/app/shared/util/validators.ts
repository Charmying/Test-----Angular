import { AbstractControl, ValidatorFn } from '@angular/forms';

export const Validators = {
  /**
   * 檢核必填欄位
   * @param errorText 可以決定是否自訂錯誤訊息
   */
  required(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const error = errorText || '此欄位為必填';
      if (!control.value) {
        return new ErrorObj(error);
      }
      return null;
    };
  },
  
  /**
   * 檢核字串長度是否小於最小長度
   * @param min number: 設定最小長度
   * @param errorText string?: 自訂錯誤訊息
   */
  minLength(min: number, errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && typeof value === 'string' && value.length < min) {
        const error = errorText || `長度不能小於 ${min} 個字元`;
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串長度是否大於最大長度
   * @param max number: 設定最大長度
   * @param errorText string?: 自訂錯誤訊息
   */
  maxLength(max: number, errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && typeof value === 'string' && value.length > max) {
        const error = errorText || `長度不能大於 ${max} 個字元`;
        return new ErrorObj(error);
      }
      return null;
    };
  },
};

export class ErrorObj {
  errorMessage = '';

  constructor(errMsg: string) {
    this.errorMessage = errMsg;
  }
}
