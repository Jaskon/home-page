import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  url: string = 'https://api.rss2json.com/v1/api.json?api_key=hh7gdvflxorj5nsvajcmfnigkjjt1fbbottcyn7c'
    + '&rss_url=https%3A%2F%2Fnews.tut.by%2Frss%2Findex.rss&order_by=pubDate&order_dir=desc';
  tutby: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.url)
    .subscribe((data) => {
      this.tutby = data;
    }, (error) => {
      console.log(error);
    });
  }

}
