import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  loading = new Subject<boolean>();
  
  constructor(
    private httpClient: HttpClient
  ) { 

   }

   setLoadingState(state:boolean = false){
     console.log("Called ccc");
    this.loading.next(state);
   }

  getLoadingState = (): Observable<boolean> => this.loading;

   public getGitHubUsersByName(name: string): Observable<IGitHubUser>{
    return this.httpClient.get<IGitHubUser>(this.baseSearchAPI, {params: {q: name}})
   }

  private readonly baseSearchAPI: string = "https://api.github.com/search/users";

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  }
}
