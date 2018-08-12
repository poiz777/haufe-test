import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store, } from '@ngrx/store';

import { NewsService } from '@pz-service/news.service';
import {NewsModel} from '@pz-models/news.model';
import {NewsCollectionModel} from '@pz-models/news-collection.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  public newsList: NewsModel[];
  public firstNews: NewsModel;
  public newsCollectionModel: NewsCollectionModel;
  errorMessage: string;

  constructor(private newsService: NewsService, private store: Store<NewsModel>) {}

  public loadFullArticle(evt) {
    const clickedLinkID = evt.target.getAttribute('data-id');

    this.store.dispatch( {
          type    : 'FETCH_NEWS',
          payload : this.newsCollectionModel.getNewsModelByID(clickedLinkID)
      }
    );
  }

  ngOnInit() {
      this.store.pipe(select('articles')).subscribe(
          articles => {
              if ( articles[0] !== undefined ) {
                  console.log(articles);
                  this.newsList = articles;
              } else {
                  this.manageStore(20);
              }
          }
      );
  }

  manageStore(numArticles: Number): any {
      this.newsService.getNewsCollection(numArticles).subscribe(
          (data: NewsModel[]) => {
              if (data['response'] === undefined) { return; }
              const collection          = this.newsService.randomizeNews(data['response']['results']);
              this.newsCollectionModel  = new NewsCollectionModel(collection, this.newsService);
              this.newsList             = this.newsCollectionModel.getNewsCollection();
              this.firstNews            = this.newsCollectionModel.getNewsModelByIndex(0);
              this.store.dispatch( {
                      type    : 'FETCH_NEWS',
                      payload : this.firstNews
                  }
              );
              this.store.dispatch( {
                      type    : 'FETCH_ALL_NEWS',
                      payload : this.newsList
                  }
              );
          },
          (err: any) => this.errorMessage = err.error
      );
  }

  ngOnDestroy() {

  }

}
