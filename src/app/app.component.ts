import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    /** 檢查是否在瀏覽器環境中 */
    if (isPlatformBrowser(this.platformId)) {
      /** 從 localStorage 取得語系，如果沒有則使用 zh-tw */
      const savedLang = localStorage.getItem('i18nLang') || 'zh-tw';
      /** 設置預設語言 */
      this.translate.setDefaultLang('zh-tw');
      /** 使用從 localStorage 取得的語系 */
      this.translate.use(savedLang);
    } else {
      /** 在非瀏覽器環境中，直接使用 zh-tw */
      this.translate.setDefaultLang('zh-tw');
      this.translate.use('zh-tw');
    }
  }

  switchLanguage(lang: string) {
    /** 切換語系並儲存到 localStorage */
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('i18nLang', lang);
    }
  }
}
