import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { NewsService } from './services/news.service';
import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { newsReducer } from '@pz-reducers/news.reducer';

@NgModule({
  declarations: [
      AppComponent,
      NewsListComponent,
      ArticleDetailsComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AngularFontAwesomeModule,
      StoreModule.forRoot({}),
      StoreModule.forFeature('article', newsReducer)
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
