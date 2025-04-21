import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-demo-button',
  standalone: true,
  templateUrl: './demo-button.component.html',
  styleUrl: './demo-button.component.scss',
  imports: [ButtonComponent],
})
export class DemoButtonComponent {
  click() {
    console.log('點擊按鈕')
  }
}
