import { Pipe, PipeTransform } from '@angular/core';

// 折扣 Pipe
@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discount: number): number {
    return value - (value * discount / 100);
  }
}
