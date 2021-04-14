import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(number): string {
    if (number <= 1024) {
      return `${Math.round(number * 100) / 100} bytes`
    } else if (number <= 1048576) {
      return `${Math.round((number/1024) * 100) / 100} KB`
    } else if (number <= 1073740824) {
      return `${Math.round((number/1048576) * 100) / 100} MB`
    } else {
      return `${Math.round((number/1073740824) * 100) / 100} GB`
    }
  }
}
