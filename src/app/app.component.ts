import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from './models/user.model';


const Get_Users = gql`
query{
  users{
    userName,
    userMail,
    rolesForUser{
      name
    },
  }
}
`;

const Get_User = gql`
query ($userMail:String){
  user(userMail:$userMail){
    userName,
    userMail,
    rolesForUser{
      name
    }
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user?: User;
  userMail: string = '';
  loaded = false

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    // this.apollo.watchQuery<any>({
    //   query: Get_Users
    // })
    //   .valueChanges
    //   .subscribe(({ data, loading }) => {
    //     console.log(loading);
    //     this.allUsers = data.users;
    //     console.log(JSON.stringify(this.allUsers));
    //   })
    return;
  }

  searchUser(){
   this.apollo.watchQuery<any>({
      query: Get_User,
     variables: {
        useMail: this.userMail
      }
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      console.log(loading);
      this.user = data.user as User;
      this.loaded = !!!this.user;
    });
  }
}
