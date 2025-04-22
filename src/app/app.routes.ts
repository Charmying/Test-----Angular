import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OriginComponent } from './pages/origin/origin.component';
import { TestPageComponent } from './pages/test/test-page/test-page.component';
import { TestForLoopComponent } from './pages/test/test-for-loop/test-for-loop.component';
import { TestIfConditionComponent } from './pages/test/test-if-condition/test-if-condition.component';
import { TestFormGroupComponent } from './pages/test/test-form-group/test-form-group.component';
import { TestInputOutputParentComponent } from './pages/test/test-input-output-parent/test-input-output-parent.component';
import { TestPipeComponent } from './pages/test/test-pipe/test-pipe.component';
import { TestDependencyInjectionComponent } from './pages/test/test-dependency-injection/test-dependency-injection.component';
import { DemoIndexComponent } from './pages/demo/demo-index/demo-index.component';
import { DemoButtonComponent } from './pages/demo/demo-button/demo-button.component';
import { DemoFormsComponent } from './pages/demo/demo-forms/demo-forms.component';
import { DemoFormsValidatorsComponent } from './pages/demo/demo-forms-validators/demo-forms-validators.component';
import { DemoIconComponent } from './pages/demo/demo-icon/demo-icon.component';
import { DemoTextComponent } from './pages/demo/demo-text/demo-text.component';
import { TestApiPageComponent } from './pages/test-api/test-api-page/test-api-page.component';
import { Test1AndTest2ApiPageComponent } from './pages/test-api/test1-and-test2-api-page/test1-and-test2-api-page.component';
import { QRCodeOrderUserInterfaceComponent } from './pages/test-api/qrcode-order/qrcode-order-user-interface/qrcode-order-user-interface.component';
import { QRCodeOrderAdminPanelComponent } from './pages/test-api/qrcode-order/qrcode-order-admin-panel/qrcode-order-admin-panel.component';

export const routes: Routes = [
  /** 預設路徑 */
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  {
    path: 'pages',
    children: [
      /** 首頁 */
      { path: 'home', component: HomeComponent },
      /** 原 app.component */
      { path: 'origin', component: OriginComponent },
      /** test */
      { path: 'test/test-page', component: TestPageComponent },
      { path: 'test/test-for-loop', component: TestForLoopComponent },
      { path: 'test/test-if-condition', component: TestIfConditionComponent },
      { path: 'test/test-form-group', component: TestFormGroupComponent },
      { path: 'test/test-input-output-parent', component: TestInputOutputParentComponent },
      { path: 'test/test-pipe', component: TestPipeComponent },
      { path: 'test/test-dependency-injection', component: TestDependencyInjectionComponent },
      /** demo */
      { path: 'demo/demo-index', component: DemoIndexComponent },
      { path: 'demo/demo-button', component: DemoButtonComponent },
      { path: 'demo/demo-forms', component: DemoFormsComponent },
      { path: 'demo/demo-forms-validators', component: DemoFormsValidatorsComponent },
      { path: 'demo/demo-icon', component: DemoIconComponent },
      { path: 'demo/demo-text', component: DemoTextComponent },
      /** test-api */
      { path: 'test-api/test-api-page', component: TestApiPageComponent },
      { path: 'test-api/test1-and-test2-api-page', component: Test1AndTest2ApiPageComponent },
        /** QR Code 點餐系統 */
        { path: 'test-api/qrcode-order-user-interface', component: QRCodeOrderUserInterfaceComponent }, // QR Code 點餐系統前台
        { path: 'test-api/qrcode-order-admin-panel', component: QRCodeOrderAdminPanelComponent }, // QR Code 點餐系統後台
    ]
  }
];
