import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, first : boolean) {

    if(first)
      return (value.charAt(0).toUpperCase())+ value.substr(1);
    let words : string[] = value.split(" ");
    let output: string = '';

    words.forEach((value:string,index:number,words:string[])=> {

      output += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
    });
    return output;
  }
}
