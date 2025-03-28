import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-api-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-api-header.component.html',
  styleUrl: './test-api-header.component.scss'
})
export class TestApiHeaderComponent {}
