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
    this.searchService.getLoadingState().subscribe(val => this.usersIsLoading = val);
  }

  ngOnInit() {
  }

  index: number = 1;

  //User is gotten from the parent component(AppComponent)
  @Input('gitHubUsers') gitHubUsers: IGitHubUser;

  getUserInfoByName(name: string, index: number){
    this.gitHubUsers.items[index].loaded = false;
    this.searchService.getGitGuhUserByName(name)
    .subscribe(val=> {
      this.gitHubUsers.items[index].followers = val.followers;
      this.gitHubUsers.items[index].following = val.following;
      this.gitHubUsers.items[index].bio = val.bio;
      this.gitHubUsers.items[index].loaded = true;
    });
  }

}
