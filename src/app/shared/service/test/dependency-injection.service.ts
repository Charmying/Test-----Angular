import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  // providedIn: 'root', // 服務在應用程序的根注入器中提供，整個應用程序共享一個實例。默認選項，通常適合大多數服務。
  // providedIn: 'any', // 每個 Lazy Loading 模組會有自己的實例，如果服務在 Lazy Loading 模組中首次使用。有助於在 Lazy Loading 場景下減少內存占用。
  // providedIn: '特定模組', // 可以指定一個模組，如 MyModule，服務將在該模組的範圍內提供。適用於只在特定模組中需要的服務。
  // providedIn: '特定組件或指令', // 通過組件的 providers 陣列提供，該組件的每個實例都有自己的服務實例。適合需要隔離狀態的場景。
})
export class DataService {
  getData() {
    return '注入的 Data';
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService1 {
  getUser() {
    return { name: 'Charmy', role: 'Admin' };
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService1 {
  constructor(private userService1: UserService1) {}

  isAuthenticated() {
    const user = this.userService1.getUser();
    return user.role === 'Admin';
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService2 {
  isAuthenticated2(user: { name: string, role: string }): boolean {
    return user.role === 'Admin';
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService2 {
  constructor(private authService2: AuthService2) {}

  getUsersWithAuthStatus() {
    const users = [
      { name: 'Charmy', role: 'Admin' },
      { name: 'Tina', role: 'User' },
    ];
    return users.map(user => ({
      ...user,
      isAuthenticated2: this.authService2.isAuthenticated2(user)
    }));
  }
}
