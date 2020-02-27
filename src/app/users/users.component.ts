import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersIsLoading: boolean = false;
  constructor(
    private searchService: SearchService
  ) { 
    //this statement is executed anytime a new query is passed to the search field
    this.searchService.getLoadingState().subscribe(val => {console.log(val); this.usersIsLoading = val;})
  }

  ngOnInit() {
  }

  index: number = 1;

  //User is gotten from the parent component(AppComponent)
  @Input('gitHubUsers') gitHubUsers: IGitHubUser;

  navigateToProfile(user: IGitHubUserItem){
    window.open(user.html_url);
  }
}
