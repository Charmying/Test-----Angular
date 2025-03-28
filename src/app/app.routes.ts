import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OriginComponent } from './pages/origin/origin.component';
import { TestApiPageComponent } from './pages/test-api/test-api-page/test-api-page.component';
import { Test1AndTest2ApiPageComponent } from './pages/test-api/test1-and-test2-api-page/test1-and-test2-api-page.component';
import { TestPageComponent } from './pages/test/test-page/test-page.component';
import { TestForLoopComponent } from './pages/test/test-for-loop/test-for-loop.component';
import { TestIfConditionComponent } from './pages/test/test-if-condition/test-if-condition.component';
import { TestFormGroupComponent } from './pages/test/test-form-group/test-form-group.component';
import { TestInputOutputParentComponent } from './pages/test/test-input-output-parent/test-input-output-parent.component';
import { TestPipeComponent } from './pages/test/test-pipe/test-pipe.component';
import { TestDependencyInjectionComponent } from './pages/test/test-dependency-injection/test-dependency-injection.component';
import { DemoIndexComponent } from './pages/demo-page/demo-index/demo-index.component';

export const routes: Routes = [
  /** 首頁 */
  { path: '', component: HomeComponent },
  /** 原 app.component */
  { path: 'origin', component: OriginComponent },
  /** test-api */
  { path: 'test-api-page', component: TestApiPageComponent },
  { path: 'test1-and-test2-api-page', component: Test1AndTest2ApiPageComponent },
  /** test */ 
  { path: 'test-page', component: TestPageComponent }, // 建立新頁面
  { path: 'for-loop', component: TestForLoopComponent }, // For 迴圈練習
  { path: 'if-condition', component: TestIfConditionComponent }, // if 判別式練習
  { path: 'FormGroup', component: TestFormGroupComponent }, // FormGroup 練習
  { path: 'InputOutputParent', component: TestInputOutputParentComponent }, // @Input() @Output() 練習
  { path: 'Pipe', component: TestPipeComponent }, // Pipe 練習
  { path: 'dependency-injection', component: TestDependencyInjectionComponent }, // Dependency Injection 練習
  /** demo */
  { path: 'demo', component: DemoIndexComponent },
];
