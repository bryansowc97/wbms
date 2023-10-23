import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, zip } from 'rxjs';
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import { environment } from 'src/environment';
import * as AWS from 'aws-sdk';
import { env } from 'process';

export interface IUser {
  email: string;
  userName: string;
  password: string;
  showPassword: boolean;
  confirmPassword?: string;
  newPassword?: string;
  code: string;
  name: string;
  contact: string;
  phone_number?: string;
  role: string;
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
    this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: environment.awsConfig.region });

  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.userName,
      password: user.password,
      attributes: {
        email: user.email,
        name: user.name,
        phone_number: user.contact
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
      return this.getCurrentUser()
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

  public getCurrentUser(): Promise<any> {
    console.log(Auth.currentUserInfo());
    return Auth.currentUserInfo();
  }

  async findUserAndAttributesByUsername(username: string): Promise<any> {
    try {
      const cognitoParamsWithUserName = {
        UserPoolId: environment.cognito.userPoolId, // Replace with your Cognito user pool ID
        Username: username
      };
      return await this.cognitoIdentityServiceProvider.adminGetUser(cognitoParamsWithUserName).promise();
    } catch (error) {
      console.error('Error finding user or retrieving attributes:', error);
    }
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

  public async updateUser(user: IUser): Promise<any> {
    let attri: any[] = [
      {email: user.email},
      {name: user.name},
      {phone_number: user.contact},
    ];
    const params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: user.userName,
      UserAttributes: attri.map(attribute => ({
        Name: Object.keys(attribute)[0],
        Value: attribute[Object.keys(attribute)[0]]
      })),
    };
    
    try {
      await this.cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
      console.log('User attributes updated successfully');
    } catch (error) {
      console.error('Error updating user attributes:', error);
    }
  }
  

  public async deleteUser(username: string): Promise<any> {
    return this.cognitoIdentityServiceProvider.adminDeleteUser({
      UserPoolId: environment.cognito.userPoolId, 
      Username: username
    })
      .promise()
      .then(data => {
        return data; 
      })
      .catch(error => {
        throw error; 
      });
  }


  public listUsers(): any {
    return this.cognitoIdentityServiceProvider.listUsers(this.cognitoParams).promise();
  }

}