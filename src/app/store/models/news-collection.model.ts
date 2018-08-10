import {NewsModel} from '@pz-models/news.model';
import {NewsService} from '@pz-service/news.service';

export class NewsCollectionModel {
    public newsCollection: NewsModel[] = [];
    public activeNews: NewsModel;

    constructor(newsCollection: Array<object>, private newsService: NewsService) {
        this.initializeCollection(newsCollection);
    }

    initializeCollection(newsCollection: Array<object>) {
        const selfRef: NewsCollectionModel = this;
        // RANDOMIZE NEWS COLLECTION...
        newsCollection = this.newsService.randomizeNews(newsCollection);
        newsCollection.forEach(function(newsItem: object) {
            // REMOVE THE CROSSWORD POST FROM THE COLLECTION... IT CONTAINS NOTHING...
            if (! /crosswords\//i.test(newsItem['id'])) {
                selfRef.newsCollection.push(new NewsModel(newsItem));
            }
        });
    }

    getNewsModelByIndex(collectionIndex: any): NewsModel {
        return this.newsCollection[collectionIndex];
    }

    getNewsCollection(): NewsModel[] {
        return this.newsCollection;
    }

    getNewsModelByID(clickedLinkID): NewsModel {
        const selfRef   = this;
        if (!this.newsCollection) {
            return null;
        }
        this.newsCollection.forEach(function(newsModel: NewsModel, intKey: number) {
            if (newsModel.id === clickedLinkID) {
                selfRef.activeNews = newsModel;
                return true;
            }
        });
        return this.activeNews;
    }

}

