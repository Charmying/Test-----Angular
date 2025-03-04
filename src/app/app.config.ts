import { ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

/** 定義 i18n 檔案的載入方式 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** 定義應用程式啟動時的初始化函數 */
export function initializeApp(translate: TranslateService, platformId: Object) {
  return async () => {
    /** 檢查是否在瀏覽器環境中 */
    const savedLang = isPlatformBrowser(platformId) ? localStorage.getItem('i18nLang') || 'zh-tw' : 'zh-tw';
    /** 設置預設語言 */
    translate.setDefaultLang('zh-tw');
    /** 使用從 localStorage 取得的語系 */
    await firstValueFrom(translate.use(savedLang));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    /** 如果需要 SSR 或 hydration */
    provideClientHydration(),
    /** 提供 HttpClient，TranslateHttpLoader 會依賴 */
    provideHttpClient(withFetch()),
    /** 匯入 TranslateModule 的配置 */
    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!,
    /** 加入 APP_INITIALIZER 來預載 i18n */
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeApp,
      deps: [TranslateService, PLATFORM_ID],
      multi: true,
    },
  ],
};