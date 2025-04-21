import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-demo-icon',
  standalone: true,
  templateUrl: './demo-icon.component.html',
  styleUrl: './demo-icon.component.scss',
  imports: [IconComponent],
})
export class DemoIconComponent {}
