import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 導入 CommonModule，*ngFor 需要，不然會產生警告
import { HeaderComponent } from "../../Component/header/header.component";

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
    { name: 'Array of Objects Item 4', description: 'This is array of objects item 4' }
  ];
}
