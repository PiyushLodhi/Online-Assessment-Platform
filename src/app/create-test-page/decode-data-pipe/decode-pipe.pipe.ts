import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodePipe'
})
export class DecodePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return atob(value);
  }

}

@Pipe({
  name:'IntToString'
})
export class IntToStringPipe implements PipeTransform{
  transform(value:number,...args:unknown[]):string{
    return String(value);
  }
}