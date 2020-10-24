import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'enumToString'})
export class StringEnumPipe implements PipeTransform {

  transform(value): any {
    switch (value) {
      case 'AUTHOR':
        return 'Auteur';
      case 'AUTHOR_ILLUSTRATOR':
        return 'Auteur illustrateur';
      case 'DESIGNER':
        return 'Designer';
      case 'ILLUSTRATOR':
        return 'Illustrateur';
    }
  }
}
