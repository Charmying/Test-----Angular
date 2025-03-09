import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { DemoTextComponent } from "../demo-text/demo-text.component";
import { DemoIconComponent } from "../demo-icon/demo-icon.component";
import { DemoButtonComponent } from "../demo-button/demo-button.component";

@Component({
  selector: 'app-demo-index',
  standalone: true,
  templateUrl: './demo-index.component.html',
  styleUrl: './demo-index.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    DemoTextComponent,
    DemoIconComponent,
    DemoButtonComponent,
  ],
})
export class DemoIndexComponent {
  options = 'text'

  demoLinks: any[] = [
    { title: 'text' },
    { title: 'icon' },
    { title: 'button' },
  ]

  changeOptions(title: string) {
    this.options = title
  }
}
