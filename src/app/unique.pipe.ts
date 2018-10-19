import { Pipe, PipeTransform } from '@angular/core';
import { _ } from 'lodash'

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {
  ackData

  transform(value: any, args?: any): any {
    this.ackData = new Set(value.map(item => item.despatchDate));
    // console.log('***', this.ackData)
    return value = new Set(value.map(item => item.despatchDate));
  }

}
