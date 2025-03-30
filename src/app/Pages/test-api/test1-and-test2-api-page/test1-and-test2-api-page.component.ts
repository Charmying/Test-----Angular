import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test1-and-test2-api-page',
  standalone: true,
  templateUrl: './test1-and-test2-api-page.component.html',
  styleUrl: './test1-and-test2-api-page.component.scss',
  imports: [HeaderComponent, TestApiHeaderComponent, SectionComponent]
})
export class Test1AndTest2ApiPageComponent implements OnInit {
  data1: any;
  data2: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('https://test-express-api-x0j9.onrender.com/test1').subscribe({
      next: (response) => {
        this.data1 = response;
        console.log('API 資料:', this.data1);
      },
      error: (err) => {
        console.error('獲取資料時發生錯誤:', err);
      }
    });

    this.http.get('https://test-express-api-x0j9.onrender.com/test2').subscribe({
      next: (response) => {
        this.data2 = response;
        console.log('API 資料:', this.data2);
      },
      error: (err) => {
        console.error('獲取資料時發生錯誤:', err);
      }
    });
  }
}
