import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url : string = "https://jsonplaceholder.typicode.com/posts/" 
  constructor(private httpClient : HttpClient) { }

  getPosts() : Observable<Array<Post>| null>{
    return this.httpClient.get<Array<Post>>(this.url).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  getPost(id: number) : Observable<Post| null>{
    return this.httpClient.get<Post>(this.url+`${id}`).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  createPost(post: Post) : Observable<Post| null>{
    return this.httpClient.post<Post>(this.url,post).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  updatePost(id: number, post: Post) : Observable<Post| null>{
    let param = new HttpParams()
    .set('id', id);
    return this.httpClient.put<Post>(this.url+ `${id}`,post).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  deletePost(id: number) : Observable<any| null>{
    return this.httpClient.delete<any>(this.url+ `${id}`)
  }
  private handleError(error: HttpErrorResponse) {
    // Log the error to the console
    console.error('An error occurred:', error);
    
    // Return a fallback value (null, empty object, etc.)
    return of(null); // You can also return `of({})` or any other fallback
  }
  
}
