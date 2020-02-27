import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userQuery: FormControl = new FormControl();

  gitHubUsers: IGitHubUser = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };

  constructor(
    private searchService: SearchService,
  ){
    // console.log("Called");
  }

  ngOnInit(){
    this.userQuery.valueChanges.pipe(
      debounceTime(2000), //request is sent after 2 seconds to reduce multiple calls due to user input delay
      distinctUntilChanged()
    ).subscribe((query:string) => {
      this.resetUsers();// re-iniliazed for every new request
      this.searchService.setLoadingState(true); // activate loader while yet to receive response
      if (query.length > 0)
      this.searchService.getGitHubUsersByName(query)
      .subscribe(users => {
        this.assignGithubUsers(users);
        this.searchService.setLoadingState(false); // turn off loader after data has been received from the API
      });
    })
  }

  public assignGithubUsers(users: IGitHubUser): void {
    this.gitHubUsers = users;
  }

  public resetUsers():void{
    this.gitHubUsers = {
      total_count: 0,
      incomplete_results: false,
      items: []
    };
  }
}
