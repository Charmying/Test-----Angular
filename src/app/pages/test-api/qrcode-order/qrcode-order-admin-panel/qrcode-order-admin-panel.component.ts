/** QR Code 點餐系統後台 */

import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TestApiHeaderComponent } from '../../shared/test-api-header/test-api-header.component';
import { SectionComponent } from '../../../../shared/components/test/section/section.component';

@Component({
  selector: 'app-qrcode-order-admin-panel',
  standalone: true,
  templateUrl: './qrcode-order-admin-panel.component.html',
  styleUrl: './qrcode-order-admin-panel.component.scss',
  imports: [HeaderComponent, TestApiHeaderComponent, SectionComponent]
})
export class QRCodeOrderAdminPanelComponent {}
