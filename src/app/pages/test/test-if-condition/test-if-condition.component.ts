import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 導入 CommonModule，*ngIf 需要，不然會產生警告
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestHeaderComponent } from '../../../shared/components/test/test-header/test-header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';

@Component({
  selector: 'app-test-if-condition',
  standalone: true,
  templateUrl: './test-if-condition.component.html',
  styleUrl: './test-if-condition.component.scss',
  imports: [CommonModule, HeaderComponent, TestHeaderComponent, SectionComponent]
})
export class TestIfConditionComponent {
  headerTitle = 'if 判別式';
  section1Title = 'if';
  section2Title = 'if';
  section3Title = 'if else';

  /* if */
  if_isVisible: boolean = true;

  status: string = 'success';
  setStatus(newStatus: string): void {
    this.status = newStatus;
  }

  /* if else */
  ifelse_isVisible: boolean = true;
}
