import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {NewsCollectionModel} from '@pz-models/news-collection.model';
import {NewsModel} from '@pz-models/news.model';

@Injectable()
export class NewsService {
  baseEndPoint:     string;
  feedEndPoint:     string;
  apiKey:           string;
  headers:          HttpHeaders;
  private newsCollection: NewsModel[];

  constructor(private http: HttpClient) {
    this.apiKey         = 'f4d7ad48-0268-4e47-9d70-096588f029df';
    this.baseEndPoint   = 'https://content.guardianapis.com/';
    this.feedEndPoint   = this.baseEndPoint + 'search?api-key=' + this.apiKey;
  }

  getNewsCollection(numArticles: Number = 10): Observable<NewsModel[]> {
    if (this.newsCollection) {
        return of(this.newsCollection);
    }
      this.headers  = new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*'
      });
      this.feedEndPoint  += '&page-size=' + numArticles;
      this.feedEndPoint  += '&show-fields=byline,firstPublicationDate,body,main,thumbnail,starRating';

      return this.http.get<any[]>(this.feedEndPoint, {headers: this.headers})
      .pipe(
          tap(data => {
              const collection              = this.randomizeNews(data['response']['results']);
              const newsCollectionModel     = new NewsCollectionModel(collection, this);
              this.newsCollection           = newsCollectionModel.getNewsCollection();
          } ),
          catchError(this.handleError)
      );
  }

  randomizeNews(array): any[] {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // SO LONG AS WE HAVE ELEMENTS TO SHUFFLE...
        while (0 !== currentIndex) {
            // SELECT REMAINING ELEMENT...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // THE SWAP WITH CURRENT ELEMENT
            temporaryValue      = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex]  = temporaryValue;
        }
        return array;
    }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

