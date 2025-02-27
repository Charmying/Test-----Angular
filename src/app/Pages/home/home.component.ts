import { Component } from '@angular/core';
import { HeaderComponent } from "../../Component/header/header.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TranslateModule, HeaderComponent]
})
export class HomeComponent {

}
