import { Component } from '@angular/core';
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
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('zh-tw'); // 預設語言為 zh-tw (指定的語言無法載入或不存在時，系統會回退使用的語言，也就是說，預設語言為 zh-tw 時，如果 en-us 翻譯檔案載入失敗，應用程式會使用 zh-tw 的翻譯)
    this.translate.use('zh-tw'); // 初始使用 zh-tw
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
