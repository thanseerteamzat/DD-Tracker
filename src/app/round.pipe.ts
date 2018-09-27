import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {


  //  @param value
  //  @returns {number}

  transform(value: number): number {
    
    value = isNaN(value) ? 0 : +value;
    var converter = require('number-to-words');
    var word = converter.toWords(value);

    return Math.round(value);
  }

}
