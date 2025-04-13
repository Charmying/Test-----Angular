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

    /**
   * 檢核電子郵件 Email 格式
   * 必須包含「@」符號，分隔 使用者名稱 (user name) 和 網域名稱 (domain name)
   * 使用者名稱 (user name) 最多 64 字元，不能連續使用「.」，且不能出現在開頭或結尾
   * 網域名稱 (domain name) 最多 255 字元，至少包含一個「.」，減號不能出現在開頭或結尾
   * Email 總長度不可超過 320 字元，且不可有空白字元
   * @param errorText string?: 自訂錯誤訊息
   */
  emailFormat(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const email = control.value?.trim();
      if (!email) return null;

      const error = errorText || 'Email 格式錯誤';
      if (/\s/.test(email) || email.length > 320) return new ErrorObj(error);

      const [userName, domain] = email.split('@');
      if (!userName || !domain) return new ErrorObj(error);

      const userNameRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
      if (userName.length > 64 || !userNameRegex.test(userName) || /^\./.test(userName) || /\.$/.test(userName) || /\.{2,}/.test(userName)) {
        return new ErrorObj(error);
      }

      const domainRegex = /^[a-zA-Z0-9.-]+$/;
      if (domain.length > 255 || !domainRegex.test(domain) || !/\./.test(domain) || /^-/.test(domain) || /-$/.test(domain) || !/\.[a-zA-Z]{2,}$/.test(domain)) {
        return new ErrorObj(error);
      }

      return null;
    };
  },

  /**
   * 檢核字串是否含有大寫英文
   * @param errorText string?: 自訂錯誤訊息
   */
  hasUpperCase(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/[A-Z]/.test(value)) {
        const error = errorText || '必須包含至少一個大寫字母';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串是否含有小寫英文
   * @param errorText string?: 自訂錯誤訊息
   */
  hasLowerCase(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/[a-z]/.test(value)) {
        const error = errorText || '必須包含至少一個小寫字母';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串是否含有數字
   * @param errorText string?: 自訂錯誤訊息
   */
  hasNumber(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/\d/.test(value)) {
        const error = errorText || '必須包含至少一個數字';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串是否含有禁止符號
   * @param errorText string?: 自訂錯誤訊息
   */
  hasForbiddenSymbols(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && /[#\$%\^*'"]/.test(value)) {
        const error = errorText || '不能包含以下符號：#、$、%、^、*、\'、"';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串中的英文是否有連續相同的字母
   * @param errorText string?: 自訂錯誤訊息
   */
  hasConsecutiveSameLetters(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && /([a-zA-Z])\1/.test(value)) {
        const error = errorText || '不能有連續相同的字母';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串中的數字是否有連續相同的數字
   * @param errorText string?: 自訂錯誤訊息
   */
  hasConsecutiveSameNumber(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && /(\d)\1/.test(value)) {
        const error = errorText || '不能有連續相同的數字';
        return new ErrorObj(error);
      }
      return null;
    };
  },

  /**
   * 檢核字串中的英文是否有連續的遞增或遞減字母
   * @param errorText string?: 自訂錯誤訊息
   */
  hasConsecutiveLetters(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value) {
        for (let i = 0; i < value.length - 1; i++) {
          const first = value.charCodeAt(i);
          const second = value.charCodeAt(i + 1);
          if (!isNaN(parseInt(value[i])) || !isNaN(parseInt(value[i + 1]))) continue;
          if (second === first + 1 || second === first - 1) {
            const error = errorText || '不能有連續遞增或遞減的字母';
            return new ErrorObj(error);
          }
        }
      }
      return null;
    };
  },

  /**
   * 檢核字串中的數字是否有遞增或遞減的數字
   * @param errorText string?: 自訂錯誤訊息
   */
  hasConsecutiveDigits(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value) {
        for (let i = 0; i < value.length - 1; i++) {
          const first = parseInt(value[i]);
          const second = parseInt(value[i + 1]);
          if (isNaN(first) || isNaN(second)) continue;
          if (second === first + 1 || second === first - 1) {
            const error = errorText || '不能有連續遞增或遞減的數字';
            return new ErrorObj(error);
          }
        }
      }
      return null;
    };
  },

  /**
   * 檢核字串中僅含英數字
   * @param errorText string?: 自訂錯誤訊息
   */
  isAlphaNumeric(errorText?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
        const error = errorText || '只能包含英文字母和數字';
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
