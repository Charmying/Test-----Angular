import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { DemoTextComponent } from "../demo-text/demo-text.component";

@Component({
  selector: 'app-demo-index',
  standalone: true,
  templateUrl: './demo-index.component.html',
  styleUrl: './demo-index.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    DemoTextComponent,
  ],
})
export class DemoIndexComponent {
  options = 'text'

  demoLinks: any[] = [
    { title: '文字' },
  ]
}
