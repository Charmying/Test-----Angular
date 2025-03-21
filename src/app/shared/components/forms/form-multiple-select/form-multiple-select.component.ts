import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OptionItem } from '../../../class/common';

@Component({
  selector: 'app-form-multiple-select',
  templateUrl: './form-multiple-select.component.html',
  styleUrls: ['./form-multiple-select.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormMultipleSelectComponent implements OnInit {
  /** FormGroup */
  @Input() form!: FormGroup;
  /** input title */
  @Input() title = '';
  /** formControlName */
  @Input() formControlName = '';
  /** 下拉選單選項 */
  @Input() options: OptionItem[] = [];
  /** placeHolder */
  @Input() placeholder = '';
  /** 是否開啟下拉選單 */
  isOpen = false;
  /** 選中的選項 */
  selectedItems: string[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    let control = this.form.get(this.formControlName);
    if (!control) {
      control = this.fb.control([]);
      this.form.addControl(this.formControlName, control);
    }
    this.selectedItems = control.value || [];
    control.valueChanges.subscribe(value => {
      this.selectedItems = value || [];
      this.cdr.markForCheck();
    });
  }

  /** 切換下拉選單開關 */
  clickDropdown() {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
  }

  /** 選項勾選 */
  checkOption(id: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const control = this.form.get(this.formControlName) as FormControl;
    const currentValue = control.value || [];
    const option = this.options.find(opt => opt.id === id);

    if (option?.isSelectAll) {
      const normalIds = this.options.filter(opt => !opt.isSelectAll).map(opt => opt.id);
      control.setValue(isChecked ? normalIds : []);
    } else {
      const newValue = isChecked ? [...currentValue, id] : currentValue.filter((item: string) => item !== id);
      control.setValue(newValue);
    }
  }

  /** 判斷選項是否被選中 */
  isSelected(id: string): boolean {
    const allOption = this.options.find(opt => opt.isSelectAll);
    if (allOption && id === allOption.id) {
      const normalIds = this.options.filter(opt => !opt.isSelectAll).map(opt => opt.id);
      return normalIds.every(optId => this.selectedItems.includes(optId));
    }
    return this.selectedItems.includes(id);
  }

  /** 取得選中選項的文字 */
  getSelectedLabels(): string {
    return this.options
      .filter(opt => this.selectedItems.includes(opt.id) && !opt.isSelectAll)
      .map(opt => opt.name)
      .join(', ');
  }
}
