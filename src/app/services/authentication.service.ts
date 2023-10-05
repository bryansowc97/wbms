import { Injectable } from '@angular/core';

// import { environment } from 'src/environments/environment';
// import { Amplify, Auth } from 'aws-amplify';
import { throwError } from 'rxjs';
import { UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    /*
  constructor() {
    // Amplify.configure({
    //   Auth: environment.cognito
    // })
  }

  // signUp(user: UserProfile):Promise<any>{
  //   return Auth.signUp({
  //     username: user.email,
  //     password: user.password,
  //     attributes:{
  //       'custom:role':user.role,
  //       'custom:fullname':user.fullname
  //     }
  //   })
  // }

  // confirmSignUp(user: UserProfile):Promise<any>{
  //   return Auth.confirmSignUp(user.email, user.code);
  // }

  signIn(user: UserProfile):Promise<any>{
    return Auth.signIn(user.email,user.password);
  }

  getUser():Promise<any>{
    return Auth.currentUserInfo();
  }

  updateUser(user: UserProfile): Promise<any>{
    return Auth.currentUserPoolUser().then((cognitoUser: any)=>{
      return Auth.updateUserAttributes(cognitoUser, user);
    })
  }

  signOut():Promise<any>{
    return Auth.signOut();
  }

  changeNewPassword(value: any, password: string):Promise<any>{
    return Auth.completeNewPassword(value, password, []);
  }

  getUserDetails(): Promise<UserProfile> {
    return this.getUser().then((user)=>{
      return {
          fullname: user.attributes['custom:fullname'] ?? "",
          role: user.attributes['custom:role'] ?? "",
          email: user.attributes['email'] ?? ""
      } as UserProfile;
    })
  }

  getRole(): Promise<any>{
    return this.getUser().then((user)=>{
      return user && user.attributes?user.attributes['custom:role']:'';
    })
  }

  getFullName(): Promise<any>{
    return this.getUser().then((user)=>{
      return user && user.attributes?user.attributes['custom:fullname']:'';
    })
  }

  // getListUser():Promise<any>{
  //   var AWS = require('aws-sdk');
  //   var params = {
  //     UserPoolId: environment.cognito.userPoolId,
  //     AttributesToGet: [
  //       'email',
  //       'custom:fullname',
  //       'custom:role'
  //     ],
  //   };
  //   return new Promise((resolve, reject) => {
  //     AWS.config.update({ region: 'us-east-1', 'accessKeyId': environment.cognito.accessKey, 'secretAccessKey': environment.cognito.secretAccessKey});
  //     var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  //     cognitoidentityserviceprovider.listUsers(params, (err: any, data: any) => {
  //       if (err) {
  //         //alert(err);
  //         reject(err)
  //       }
  //       else {
  //         // console.log("data", data);
  //         resolve(data)
  //       }
  //     })
  //   });
  // }

  disableUser(User: any):Promise<any>{
    var AWS = require('aws-sdk');
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: User.Username
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({ region: 'us-east-1', 'accessKeyId': environment.cognito.accessKey, 'secretAccessKey': environment.cognito.secretAccessKey});
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDisableUser(params, (err: any, data: any) => {
        if (err) {
          //alert(err);
          reject(err)
        }
        else {
          //alert("data"+ data);
          resolve(data)
        }
      })
    });
  }

  enableUser(User: any):Promise<any>{
    var AWS = require('aws-sdk');
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: User.Username
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({ region: 'us-east-1', 'accessKeyId': environment.cognito.accessKey, 'secretAccessKey': environment.cognito.secretAccessKey});
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminEnableUser(params, (err: any, data: any) => {
        if (err) {
          //alert(err);
          reject(err)
        }
        else {
          //alert("data"+ data);
          resolve(data)
        }
      })
    });
  }

  createUser(User: UserProfile):Promise<any>{
    var AWS = require('aws-sdk');
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: User.email,
      DesiredDeliveryMediums: ["EMAIL"],
      UserAttributes:  [
        {
           Name: 'custom:fullname',
           Value: User.fullname 
       },
       {
        Name: 'custom:role',
        Value: User.role
      },
        {
           Name: 'email',
           Value: User.email
       },
        {
           Name: 'email_verified',
           Value: 'true'
       },
   ]
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({ region: 'us-east-1', 'accessKeyId': environment.cognito.accessKey, 'secretAccessKey': environment.cognito.secretAccessKey});
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminCreateUser(params, (err: any, data: any) => {
        if (err) {
          //alert(err);
          reject(err)
        }
        else {
          //alert("data"+ data);
          resolve(data)
        }
      })
    });
  }
  */
}
