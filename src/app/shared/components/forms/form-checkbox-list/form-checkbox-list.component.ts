import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseCommonObj } from '../../../class/common';

@Component({
  selector: 'app-form-checkbox-list',
  templateUrl: './form-checkbox-list.component.html',
  styleUrls: ['./form-checkbox-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormCheckboxListComponent implements OnInit {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** checkbox 選項 */
  @Input() data: BaseCommonObj[] = [];
  /** formControlName */
  @Input() formControlName = '';

  ngOnInit(): void {
    if (!this.form.get(this.formControlName)?.value) {
      this.form.get(this.formControlName)?.setValue([]);
    }
  }

  isChecked(id: string): boolean {
    const currentValue = this.form.get(this.formControlName)?.value || [];
    return currentValue.includes(id);
  }

  onCheckboxChange(id: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentValue = this.form.get(this.formControlName)?.value || [];
    if (isChecked) {
      this.form.get(this.formControlName)?.setValue([...currentValue, id]);
    } else {
      this.form.get(this.formControlName)?.setValue(currentValue.filter((item: string) => item !== id));
    }
  }
}
