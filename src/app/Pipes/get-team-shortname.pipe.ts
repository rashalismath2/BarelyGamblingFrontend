import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTeamShortnamePipe'
})
export class GetTeamShortnamePipe implements PipeTransform {

  transform(value: string,char : string):string {
    var str=value.split(" ")
    var resturnStr=""
    str.forEach(element => {
      resturnStr=resturnStr+element[0].toUpperCase()
    });
    return resturnStr;
  }

}
