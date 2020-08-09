import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ConfirmPasswordValidator} from './customvalidatorr';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/AppConstants';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  username:string="";
  organisation:string="";
  email:string="";
  phonenumber:string="";
  password:string="";
  repassword:string="";
  Role: any = [];
  position:string="";
  key=AppConstants.captchawebkey;
  //errors vairbles
  emailexist:boolean=false;
  emailnotofficial:boolean=false;

  captchatoken=null;

  isloginError:boolean=false;

  registerform:FormGroup;
   
  captchaverified:boolean=false;

  constructor(private fb: FormBuilder,private authservice:AuthservicesService,private router:Router) {

   }

  ngOnInit(): void {
   // this.addRecaptchaScript();

    this.registerform=this.fb.group( { 
    firstName: new FormControl('',Validators.required),
    organisation: new FormControl('',Validators.required),
    emailid: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
    confirmPassword: new FormControl('',Validators.required),
    phonenumber:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
    position:new FormControl('',Validators.required)
  },
     { validator: ConfirmPasswordValidator.MatchPassword });

     this.authservice.rolelist().subscribe((data:any)=>{
      console.log(data);
      for(var x in data)
      {
        this.Role[x]=data[x].role;
      }
      
    }
     );
  }

  onSubmit(f: FormGroup)
  {
   
    this.username=f.controls.firstName.value;
    this.email=f.controls.emailid.value;
    this.organisation=f.controls.organisation.value;
    this.password=f.controls.password.value;
    this.position=f.controls.position.value;
    let randomotp=Math.floor(100000 + Math.random() * 900000).toString();
    let packet={"name":f.controls.firstName.value,"organization":f.controls.organisation.value,"email":f.controls.emailid.value,
    "password":f.controls.password.value,"role":f.controls.position.value,"phoneNumber":f.controls.phonenumber.value,"otp":randomotp};
    this.authservice.register(packet).subscribe((data:any)=>{
      
      if(data.succeeded)
      {
        localStorage.setItem('email',f.controls.emailid.value);
        
        this.router.navigate(['/otp-verification']);
      }
      else if(data.error==1)
      {
    
        this.emailexist=true;
      }
    },
    (err:HttpErrorResponse)=>
    {
      this.isloginError=true;
    }
    )
  }

  emailcheck(value)
  {
    this.emailnotofficial=false;
   let unofficialmails=['gmail','gmail.com','yahoo','yahoo.com','yahoo.com','outlook.com', 'AOL.com', 'zoho.com', 'mail.com',
    'ProtonMail.com','Pepipost.com','HubSpot.com','GMX.com','icloud.com','yandex.com'];
    let temp:string=value.target.value;
    let ind=temp.indexOf('@');
    if(unofficialmails.indexOf(temp.substr(ind+1))!=-1)
    this.emailnotofficial=true;
  }


  verifieduser()
  {
    this.captchaverified=true;
  }
  
//NAvbar work here
 navbarOpen = false;

 toggleNavbar() {
   this.navbarOpen = !this.navbarOpen;
 } 


 public resolved(captchaResponse: string) {
  //console.log(captchaResponse);

  this.authservice.verify1captcha(captchaResponse).subscribe((data:any)=>{
      console.log(data);
    if(data.success)
    {
      this.captchaverified=true;
    }
    else 
    {
      this.captchaverified=false;
      
    }
  },
  (err:HttpErrorResponse)=>
  {
    this.captchaverified=false;
  }
  )

}

}
