import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  replaceSpace(value:string) {
    value = value.replace(' ', '-');
    this.transform(value);
  }

  transform(value: any, args?: any): any {
    value = value.toLowerCase();
    if(/\s/.test(value)) {
      let values = value.split(' ');
      for (let i = 0; i < values.length--; ++i) {
        value = value.replace(' ', '-');
      }
    }
    switch (value) {
      case 'online':
        return '#43b581';
        break;
      case 'offline':
        return '#747f8d';
        break;
      case 'absent':
        return '#faa61a';
        break;
      case 'do-not-disturb':
        return '#f04747';
        break;

      default:
        return false;
        break;
    }
  }

}
