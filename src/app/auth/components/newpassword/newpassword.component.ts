import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPasswordValidator } from '../register/customvalidatorr';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  passsword:string="";
  noUserExist:boolean=false;
  passwordform:FormGroup;
  constructor(private fb: FormBuilder,private authservice:AuthservicesService,private router:Router) { }

  ngOnInit(): void {
    this.passwordform=this.fb.group( 
      { password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
      confirmPassword: new FormControl('',Validators.required), 
  },{ validator: ConfirmPasswordValidator.MatchPassword });
}
onSubmit(f:FormGroup)
{
  
  let packet={"email":localStorage.getItem("email"),"password":f.controls.password.value};
  
  this.authservice.newpassword(packet).subscribe((data:any)=>{
 
    if(data.succeeded)
    {
    
      this.router.navigate(['/login']);
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

