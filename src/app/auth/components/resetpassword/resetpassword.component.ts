import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  email:string="";
  noUserExist:boolean=false;
  passwordform:FormGroup;
  constructor(private fb: FormBuilder,private authservice:AuthservicesService,private router:Router) { }

  ngOnInit(): void {
    this.passwordform=this.fb.group( 
      { email: new FormControl('',[Validators.required,Validators.email]),
  });
}
onSubmit(f:FormGroup)
{
  let packet={"email":f.controls.email.value,"resetotp":Math.floor(100000 + Math.random() * 900000).toString()};
  localStorage.setItem('email',f.controls.email.value);
 
  this.authservice.resetpassword(packet).subscribe((data:any)=>{
    
    if(data.succeeded)
    {
     
      this.router.navigate(['/password-forgot-otp']);
    }
    else{
      this.noUserExist=true;
    }
},
(err:HttpErrorResponse)=>
{
  this.noUserExist=true;
}
  );
}

}
