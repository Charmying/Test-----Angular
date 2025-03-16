import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestHeaderComponent } from '../../../shared/components/test/test-header/test-header.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
  imports: [HeaderComponent, TestHeaderComponent]
})
export class TestPageComponent {}
