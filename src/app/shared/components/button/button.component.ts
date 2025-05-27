import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
})
export class ButtonComponent {
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  @Input() text = '';
  @Input() buttonClass = '';
  @Input() border = true;
  @Input() textColor: string = '#000000';
  @Input() backgroundColor: string = '#FFFFFF';
  @Input() borderColor: string = '#000000';
  @Output() buttonClick = new EventEmitter<void>();

  click(): void {
    this.buttonClick.emit();
  }

  /** 是否使用 inline style 模式 */
  get useInlineStyle(): boolean {
    return !this.buttonClass;
  }
}
