import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OriginComponent } from './pages/test/origin/origin.component';
import { PageComponent } from './pages/test/page/page.component';
import { ForLoopComponent } from './pages/test/for-loop/for-loop.component';
import { IfConditionComponent } from './pages/test/if-condition/if-condition.component';
import { FormGroupComponent } from './pages/test/form-group/form-group.component';
import { InputOutputParentComponent } from './pages/test/input-output-parent/input-output-parent.component';
import { PipeComponent } from './pages/test/pipe/pipe.component';
import { DependencyInjectionComponent } from './pages/test/dependency-injection/dependency-injection.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // 首頁
  { path: 'origin', component: OriginComponent }, // 原 app.component
  { path: 'page', component: PageComponent }, // 測試建立新頁面
  { path: 'for-loop', component: ForLoopComponent }, // For 迴圈練習
  { path: 'if-condition', component: IfConditionComponent }, // if 判別式練習
  { path: 'FormGroup', component: FormGroupComponent }, // FormGroup 練習
  { path: 'InputOutputParent', component: InputOutputParentComponent }, // @Input() @Output() 練習
  { path: 'Pipe', component: PipeComponent }, // Pipe 練習
  { path: 'dependency-injection', component: DependencyInjectionComponent }, // Dependency Injection 練習
];
