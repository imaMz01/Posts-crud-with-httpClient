import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../Models/Post';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], title : string): Post[] {
    if(title=="")
      return posts
    return posts.filter(post => post.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
  }

}
