import { Injectable } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import { environment } from 'src/environment';
import * as AWS from 'aws-sdk';

export interface IUser {
  email: string;
  userName: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  contact: number;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;
  
  cognitoParams = {
    UserPoolId: environment.cognito.userPoolId, // Replace with your Cognito user pool ID
  };

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);

    // Set up aws cognito connection, so can use their built-in queries for user
    AWS.config.region = environment.awsConfig.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.awsConfig.identitiyPoolId
    })
    this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.userName,
      password: user.password,
      attributes: {
        email: user.email,
        name: user.name
      }
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.userName, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  async getUserGroups() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.signInUserSession.accessToken.payload['cognito:groups'];
    } catch (error) {
      console.error('Error getting user groups:', error);
      return [];
    }
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
  

  public listUsers(): any {
    return this.cognitoIdentityServiceProvider.listUsers(this.cognitoParams).promise();
  }

}