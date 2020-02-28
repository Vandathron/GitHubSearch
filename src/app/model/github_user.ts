interface IGitHubUser{
    total_count:number;
    incomplete_results: boolean;
    items: IGitHubUserItem[];

}

interface IGitHubUserItem{
    login:string;
    id:number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url:string;
    html_url: string;
    followers_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: string;
    score: number;
    followers: number;
    following: number;
    bio: string
    loaded: boolean;
}