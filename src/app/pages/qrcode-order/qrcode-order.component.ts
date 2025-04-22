/** QR Code 點餐系統前台 */

import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../test-api/shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../shared/components/test/section/section.component';

@Component({
  selector: 'app-qrcode-order',
  standalone: true,
  templateUrl: './qrcode-order.component.html',
  styleUrl: './qrcode-order.component.scss',
  imports: [HeaderComponent, TestApiHeaderComponent, SectionComponent]
})
export class QRCodeOrderComponent {}
