import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldNames',
  standalone: true,
})
export class FieldNamesPipe implements PipeTransform {
  transform<T extends Record<string, any>>(items: T[]): string[] {
    return Object.keys(items[0]);
  }
}
