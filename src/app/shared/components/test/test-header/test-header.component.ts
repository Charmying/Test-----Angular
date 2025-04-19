import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test-header.component.html',
  styleUrl: './test-header.component.scss'
})
export class TestHeaderComponent {
  @Input() headerTitle!: string;
}
