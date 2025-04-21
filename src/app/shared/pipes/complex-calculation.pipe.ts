import { Pipe, PipeTransform } from '@angular/core';

// 接受一個數字 Array 並返回其平方根的和，然後除以數組中所有偶數的乘積
@Pipe({
  name: 'complexCalculation',
  standalone: true
})
export class ComplexCalculationPipe implements PipeTransform {
  transform(value: number[]): number {
    if (!Array.isArray(value) || value.length === 0) {
      return 0;
    }
    const sqrtSum = value.reduce((sum, num) => sum + Math.sqrt(num), 0);
    const evenProduct = value.filter(num => num % 2 === 0).reduce((product, num) => product * num, 1);
    if (evenProduct === 0) {
      return 0;
    }
    return sqrtSum / evenProduct;
  }
}
