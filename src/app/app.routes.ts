import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PageComponent } from './Pages/page/page.component';
import { OriginComponent } from './Pages/origin/origin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // 首頁
  { path: 'origin', component: OriginComponent }, // 原 app.component
  { path: 'page', component: PageComponent }, // 測試建立新頁面
];
