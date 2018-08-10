export class NewsModel {
    public id: string;
    public webTitle: string;
    public payload: object;
    public webUrl: string;
    public fields: object;
    public byline: string;
    public firstPublicationDate: string;
    public webPublicationDate: string;
    public body: string;
    public main: string;
    public thumbnail: string;

    constructor(payload: object) {
        let _key: any;
        this.payload                = payload;
        this.id                     = (_key = this.payload['id'])           !== undefined ? _key : '';
        this.fields                 = (_key = this.payload['fields'])       !== undefined ? _key : {};
        this.webUrl                 = (_key = this.payload['webUrl'])       !== undefined ? _key : '' ;
        this.webTitle               = (_key = this.payload['webTitle'])     !== undefined ? _key : '';
        this.body                   = (_key = this.fields['body'])          !== undefined ? _key : '';
        this.main                   = (_key = this.fields['main'])          !== undefined ? _key : '';
        this.byline                 = (_key = this.fields['byline'])        !== undefined ? _key : '';
        this.thumbnail              = (_key = this.fields['thumbnail'])     !== undefined ? _key : '';
        this.firstPublicationDate   = (_key = this.fields['firstPublicationDate']) !== undefined ? _key : '';
        this.webPublicationDate     = (_key = this.payload['webPublicationDate'])  !== undefined ? _key : '';
    }

}

