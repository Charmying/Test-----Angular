import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-header.component.html',
  styleUrl: './test-header.component.scss'
})
export class TestHeaderComponent {
  @Input() headerTitle!: string;
}
