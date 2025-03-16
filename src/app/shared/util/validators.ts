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
};

export class ErrorObj {
  errorMessage = '';

  constructor(errMsg: string) {
    this.errorMessage = errMsg;
  }
}
