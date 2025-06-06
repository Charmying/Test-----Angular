import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/pages/test-api/qrcode-order-login']);
      return false;
    }
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        this.router.navigate(['/pages/test-api/qrcode-order-login']);
        return false;
      }
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      this.router.navigate(['/pages/test-api/qrcode-order-login']);
      return false;
    }
  }
}
