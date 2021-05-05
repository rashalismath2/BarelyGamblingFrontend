import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCurrency'
})
export class GetCurrencyPipe implements PipeTransform {

  transform(value:string,args:string): string {
    return value+" $";
  }

}
