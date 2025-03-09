import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-demo-index',
  standalone: true,
  templateUrl: './demo-index.component.html',
  styleUrl: './demo-index.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
  ],
})
export class DemoIndexComponent {
  demoLinks: any[] = [
    { title: '文字' },
  ]
}
