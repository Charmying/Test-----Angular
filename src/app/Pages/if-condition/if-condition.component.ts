import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 導入 CommonModule，*ngIf 需要，不然會產生警告
import { HeaderComponent } from "../../Component/header/header.component";
import { SectionComponent } from "../../Component/section/section.component";

@Component({
  selector: 'app-if-condition',
  standalone: true,
  templateUrl: './if-condition.component.html',
  styleUrl: './if-condition.component.scss',
  imports: [CommonModule, HeaderComponent, SectionComponent]
})
export class IfConditionComponent {
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
