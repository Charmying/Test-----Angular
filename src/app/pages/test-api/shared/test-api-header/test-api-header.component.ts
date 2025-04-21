import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-api-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test-api-header.component.html',
  styleUrl: './test-api-header.component.scss'
})
export class TestApiHeaderComponent {}
