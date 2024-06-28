import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../Component/header/header.component";
import { SectionComponent } from "../../Component/section/section.component";
import { Observable } from 'rxjs/internal/Observable';
import { delay, of } from 'rxjs';
import { DiscountPipe } from "../../Formate/DiscountPipe";
import { ComplexCalculationPipe } from '../../Formate/ComplexCalculationPipe';

@Component({
  selector: 'app-pipe',
  standalone: true,
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss',
  imports: [CommonModule, HeaderComponent, SectionComponent, DiscountPipe, ComplexCalculationPipe]
})
export class PipeComponent {
  headerTitle = 'Pipe';
  section1Title = '內建 Pipe';
  content1Title = 'DatePipe: 將日期對象格式化為用戶可讀的字符串格式';
  content2Title = 'UpperCasePipe: 將字符串轉換為全部大寫';
  content3Title = 'LowerCasePipe: 將字符串轉換為全部小寫';
  content4Title = 'CurrencyPipe: 將數字轉換為貨幣格式';
  content5Title = 'DecimalPipe: 將數字格式化為指定的小數格式';
  content6Title = 'PercentPipe: 將數字轉換為百分比格式';
  content7Title = 'JsonPipe: 轉換為 JSON 字符串格式，方便調試和顯示';
  content8Title = 'AsyncPipe: 訂閱 Observable 或 Promise 並自動解開其值，方便在模板中使用非同步數據';
  section2Title = '自訂 Pipe';
  content9Title = 'DiscountPipe: 自訂價格折扣 Pipe';
  content10Title = 'ComplexCalculationPipe: 接受一個數字 Array 並返回其平方根的和，然後除以數組中所有偶數的乘積';
  
  today: number = Date.now();
  string = 'Hello World'
  number = 3.14159265359;
  jsonData = {
    name: 'Charmy',
    version: 27,
    interest: ['LOL', 'Apex']
  };
  observableData: Observable<string> = of('Hello from Observable!').pipe(delay(5000));
  products = [
    { name: 'Product 1', price: 1000 }, // discount: 20 = 打 8 折 → price = 800
    { name: 'Product 2', price: 2000 }, // discount: 20 = 打 8 折 → price = 1600
    { name: 'Product 3', price: 3000 }, // discount: 20 = 打 8 折 → price = 2400
  ];
  tryComplexCalculationArray = [1, 2, 3, 4, 5, 6];
}
