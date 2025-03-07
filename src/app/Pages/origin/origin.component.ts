import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Component1Component } from "../../component/component1/component1.component";
import { Component2Component } from "../../component/component2/component2.component";
import { HeaderComponent } from "../../component/header/header.component";

@Component({
  selector: 'app-origin',
  standalone: true,
  templateUrl: './origin.component.html',
  styleUrl: './origin.component.scss',
  imports: [RouterOutlet, Component1Component, Component2Component, HeaderComponent]
})
export class OriginComponent {
  title = 'Test';
}
