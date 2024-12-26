import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
  standalone: true,
})
export class SlugifyPipe implements PipeTransform {
  transform(movie: any): string {
    const title = movie.title || movie.name || movie.original_name || '';
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
