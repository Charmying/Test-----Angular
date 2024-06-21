import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 導入 CommonModule，*ngFor 需要，不然會產生警告
import { HeaderComponent } from "../../Component/header/header.component";
import { Category, CategoryInterface } from './category.types';

@Component({
    selector: 'app-for-loop',
    standalone: true,
    templateUrl: './for-loop.component.html',
    styleUrl: './for-loop.component.scss',
    imports: [CommonModule, HeaderComponent]
})
export class ForLoopComponent {
  /* Array */
  array = ['arrayItem 1', 'arrayItem 2', 'arrayItem 3', 'arrayItem 4'];
  
  /* Array of Objects 物件陣列 */
  arrayObjects = [
    { name: 'Array of Objects Item 1', description: 'This is array of objects item 1' },
    { name: 'Array of Objects Item 2', description: 'This is array of objects item 2' },
    { name: 'Array of Objects Item 3', description: 'This is array of objects item 3' },
    { name: 'Array of Objects Item 4', description: 'This is array of objects item 4' },
  ];

  /* Practice */
  categoryList: CategoryInterface[] = [
    {
      name: Category.CellPhone,
      products: [
        {
          name: 'iPhone 15',
          attributes: [
            { name: 'Color', value: 'Blue' },
            { name: 'Storag', value: '256GB' },
            { name: 'Price', value: 'NT$33,400' },
          ]
        },
        {
          name: 'iPhone 15 Plus',
          attributes: [
            { name: 'Color', value: 'Blue' },
            { name: 'Storag', value: '256GB' },
            { name: 'Price', value: 'NT$36,400' },
          ]
        },
        {
          name: 'iPhone 15 Pro',
          attributes: [
            { name: 'Color', value: 'Blue Titanium' },
            { name: 'Storag', value: '256GB' },
            { name: 'Price', value: 'NT$40,400' },
          ]
        },
        {
          name: 'iPhone 15 Pro Max',
          attributes: [
            { name: 'Color', value: 'Blue Titanium' },
            { name: 'Storag', value: '256GB' },
            { name: 'Price', value: 'NT$44,900' },
          ]
        },
      ]
    },
    {
      name: Category.NoteBook,
      products: [
        {
          name: 'MacBook Air',
          attributes: [
            { name: 'Size', value: '13-inch' },
            { name: 'Chip', value: 'M2' },
            { name: 'RAM', value: '8GB' },
            { name: 'Storage', value: '256GB SSD' },
            { name: 'Price', value: 'NT$29,900' },
          ]
        },
        {
          name: 'MacBook Air',
          attributes: [
            { name: 'Size', value: '15-inch' },
            { name: 'Chip', value: 'M3' },
            { name: 'RAM', value: '16GB' },
            { name: 'Storage', value: '512GB SSD' },
            { name: 'Price', value: 'NT$51,600' },
          ]
        },
        {
          name: 'MacBook Pro',
          attributes: [
            { name: 'Size', value: '14-inch' },
            { name: 'Chip', value: 'M3 Pro' },
            { name: 'RAM', value: '18GB' },
            { name: 'Storage', value: '512GB SSD' },
            { name: 'Price', value: 'NT$69,900' },
          ]
        },
        {
          name: 'MacBook Pro',
          attributes: [
            { name: 'Size', value: '16-inch' },
            { name: 'Chip', value: 'M3 Max' },
            { name: 'RAM', value: '48GB' },
            { name: 'Storage', value: '1TB SSD' },
            { name: 'Price', value: 'NT$129,900' },
          ]
        },
      ]
    }
  ];
}
