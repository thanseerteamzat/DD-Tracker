import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toWord'
})
export class ToWordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = isNaN(value) ? 0 : +value;
    var roundVal = Math.round(value);
    var converter = require('number-to-words');
    var word = converter.toWords(roundVal).toUpperCase();


    return word;
  }

}
