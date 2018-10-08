import { Pipe, PipeTransform } from '@angular/core';
import { ToWordsService } from './services/to-words.service';

@Pipe({
  name: 'toWord'
})
export class ToWordPipe implements PipeTransform {
  constructor(public toWord: ToWordsService) { }
  transform(value: any, args?: any): any {
    value = isNaN(value) ? 0 : +value;
    var roundVal = Math.round(value);
    var converter = require('number-to-words');
    var word = this.toWord.number2text(roundVal)

    return word;
  }


}


