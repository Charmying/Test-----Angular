import { Component } from '@angular/core';
import { HeaderComponent } from "../../Component/header/header.component";

@Component({
  selector: 'app-page',
  standalone: true,
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  imports: [HeaderComponent]
})
export class PageComponent {

}
