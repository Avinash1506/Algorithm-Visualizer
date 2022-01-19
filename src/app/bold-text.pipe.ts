import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'boldText'
})
export class BoldTextPipe implements PipeTransform {

  constructor(private sanitizer: Sanitizer){}

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string, regex:string): any {
    return this.sanitize(this.replace(value, regex));
  }

  replace(str:string, regex:string) {
    return str.replace(new RegExp(`(${regex})`, 'gi'), '<b>$1</b>');
  }

  sanitize(str:string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
