import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  
  constructor(
    private httpClient: HttpClient
  ) { 

   }

  setLoadingState(state:boolean = false){
    this.loading.next(state);
  }

  getLoadingState = (): Observable<boolean> => this.loading;

  public getGitHubUsersByName(name: string): Observable<IGitHubUser>{
    return this.httpClient.get<IGitHubUser>(this.baseSearchAPI +"search/users", {params: {q: name}})
  }

  public getGitGuhUserByName(name: string): Observable<any>{
    return this.httpClient.get<any>(this.baseSearchAPI+`users/${name}`);
  }

  private loading = new Subject<boolean>();

  private readonly baseSearchAPI: string = "https://api.github.com/";

}
