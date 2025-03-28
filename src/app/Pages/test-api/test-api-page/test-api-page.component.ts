import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';

@Component({
  selector: 'app-test-api-page',
  standalone: true,
  templateUrl: './test-api-page.component.html',
  styleUrl: './test-api-page.component.scss',
  imports: [HeaderComponent, TestApiHeaderComponent, SectionComponent]
})
export class TestApiPageComponent {}
