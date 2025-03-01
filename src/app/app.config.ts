import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { firstValueFrom } from 'rxjs';

/** 定義 i18n 檔案的載入方式 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** 定義應用程式啟動時的初始化函數 */
export function initializeApp(translate: TranslateService) {
  return async () => {
    /** 設置預設語言 */
    translate.setDefaultLang('zh-tw');
    /** 等 i18n 載入完成 */
    await firstValueFrom(translate.use('zh-tw'));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    /** 如果需要 SSR 或 hydration */
    provideClientHydration(),
    /** 提供 HttpClient，TranslateHttpLoader 會依賴 */
    provideHttpClient(),
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
      deps: [TranslateService],
      multi: true,
    },
  ],
};