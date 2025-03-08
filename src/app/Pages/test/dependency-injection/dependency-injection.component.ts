import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SectionComponent } from '../../../shared/components/test/section/section.component';
import { AuthService1, AuthService2, DataService, UserService2 } from '../../../shared/service/test/dependency-injection.service';

@Component({
  selector: 'app-dependency-injection',
  standalone: true,
  templateUrl: './dependency-injection.component.html',
  styleUrl: './dependency-injection.component.scss',
  imports: [CommonModule, HeaderComponent, SectionComponent]
})
export class DependencyInjectionComponent {
  headerTitle = 'Dependency Injection (DI) 依賴注入';
  section1Title = '嘗試注入 string';
  certificationStatus = '認證狀態';
  certified = '已認證';
  uncertified = '未認證';

  injectData: string;
  isAuthenticated: boolean;
  users: { name: string, role: string, isAuthenticated2: boolean }[] = [];

  constructor(private dataService: DataService, private authService1: AuthService1, private userService2: UserService2, private authService2: AuthService2) {
    this.injectData = this.dataService.getData();
    this.isAuthenticated = this.authService1.isAuthenticated();
    this.users = this.userService2.getUsersWithAuthStatus();
  }
}
