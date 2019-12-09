import { Component, OnInit, Input } from '@angular/core';

import { NewsService } from '@pz-service/news.service';
import {NewsModel} from '@pz-models/news.model';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  @Input() activeNews: NewsModel;

  constructor(private newsService: NewsService, private store: Store<NewsModel>) {}

  getFormattedArticleDate(dateString: string): string {
    const options     = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const articleDate = new Date(dateString);
    // return articleDate.toLocaleDateString('it-CH', options); // NOT IDEAL FOR MOBILES DUE TO WORD-BREAKS... :-(
    return articleDate.toLocaleString();
  }

  ngOnInit() {
    
      this.store.pipe(select('article')).subscribe(
          article => {
              if (article) {
                console.log(article);
                this.activeNews = article.article;
              }
          }
      );
      
  }
}

