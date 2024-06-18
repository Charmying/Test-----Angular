import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Component1Component } from "./Component/component1/component1.component";
import { Component2Component } from "./Component/component2/component2.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, Component1Component, Component2Component]
})
export class AppComponent {
  title = 'Test';
}
