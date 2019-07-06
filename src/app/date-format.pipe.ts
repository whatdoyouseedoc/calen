import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, to?: string): any {
    switch (to) {
      case 'DAY_NUMBER':
        return moment(value).format('D');
      default:
        return value;
    }
  }

}
