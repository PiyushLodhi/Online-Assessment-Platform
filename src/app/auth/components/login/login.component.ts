import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthservicesService,private router:Router) { }

  ngOnInit(): void {
  }
 
  email:string="";
  password:string="";
 
  wrongpassword:boolean=false;
  notregistered:boolean=false;


 loginform= new FormGroup({
     
      emailid: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
  })

  onSubmit(f: FormGroup)
  {
    

    let packet={"email":f.controls.emailid.value,"password":f.controls.password.value};
    this.authservice.login(packet).subscribe((data:any)=>{
      
      if(data.succeeded) 
      {
        sessionStorage.setItem('token',data.token);
        this.router.navigate(['/test-page']);
      }
      else if(data.error==4)
      {
        this.wrongpassword=true;
      }
      else if(data.error==5)
      {
        this.notregistered=true;
      }
    },
    (err:HttpErrorResponse)=>
    {
    }
    )
  }
//NAvbar work here
  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    if (window.pageYOffset > 50) {
      let element = document.getElementById('mainNav');
      element.classList.add('navbar-scrolled');
    } else {
     let element = document.getElementById('mainNav');
       element.classList.remove('navbar-scrolled'); 
    }
 }

 navbarOpen = false;

 toggleNavbar() {
   this.navbarOpen = !this.navbarOpen;
 } 

}
