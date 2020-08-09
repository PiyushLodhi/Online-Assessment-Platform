import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConstants } from '../../shared/constants/AppConstants';
@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  authurl = AppConstants.apiURL; //"https://localhost:5001/api";
  confirmurl = "test.com";
  constructor(private http: HttpClient) { }

  login(model: any) {
    let encode = model.email + ';' + model.password;
    console.log(encode);
    let httpHeaders = new HttpHeaders({ 'No-Auth': 'True' });
    //retun this.http.post()
    return this.http.post(this.authurl + '/User/login', model, { headers: httpHeaders });
    //.pipe(
    //   map((response:any)=>
    // {
    //   const user =response;
    //   console.log(response.result);
    //   if(user.result.succeeded)
    //   {
    //     localStorage.setItem('token',user.token);
    //   }
    // })
    // )
  }


  rolelist() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json', 'No-Auth': 'True'
    });
    let options = { headers: httpHeaders };
    return this.http.get(this.authurl + '/Roles', { headers: httpHeaders });
  }

  register(model: any) {
    let headers = new HttpHeaders({ 'confirmEmailUrl': this.confirmurl });
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json', 'No-Auth': 'True'
    });
    let options = { headers: httpHeaders };
    return this.http.post(this.authurl + '/User/register', model, { headers: httpHeaders });
  }

  otpverify(model: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json', 'No-Auth': 'True'
    });
    let options = { headers: httpHeaders };
    return this.http.post(this.authurl + '/User/verify', model, options);
  }


  resetpassword(model: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    console.log(model);
    return this.http.post(this.authurl + '/User/resetPassword', model);
  }

  resetpasswordotpverify(model: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    console.log(model);
    return this.http.post(this.authurl + '/User/resetPasswordVerifyOtp', model);
  }

  newpassword(model: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    console.log(model);
    return this.http.post(this.authurl + '/User/newPassword', model);
  }

  resendregisterotp(model: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    return this.http.post(this.authurl + '/User/resendOtp', model, options);
  }

  public isPremium():Observable<boolean>{
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    return this.http.get<boolean>(this.authurl+ '/User/isPremium',options);
  }

  public setpremium(model:any){
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: httpHeaders };
    return this.http.post(this.authurl+ '/transaction',model,options);
  }

verify1captcha(model:string) {
  let httpHeaders = new HttpHeaders({
    'No-Auth': 'True'
  });
  let options = { headers: httpHeaders };
  const params1 = new HttpParams()
  .set('secret', AppConstants.captchasecretkey)
  .set('response', model);
  console.log(params1.toString())
  return this.http.get('https://www.google.com/recaptcha/api/siteverify',{ headers: httpHeaders,params:params1 });
}

}