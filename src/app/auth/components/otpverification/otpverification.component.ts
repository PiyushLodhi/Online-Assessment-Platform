import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.scss']
})
export class OtpverificationComponent implements OnInit {
  title = 'otp';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  isotperror:boolean=false;

  ngOnInit() {

  }

  constructor(private authservice:AuthservicesService,private router:Router) {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements) {
    const group: any = {};

    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  onSubmit(f: FormGroup) {

    let enteredotp=this.form.value["input1"]+this.form.value["input2"]+this.form.value["input3"]+this.form.value["input4"]+this.form.value["input5"]+this.form.value["input6"];
 
    let packet={"email":localStorage.getItem('email'),"otp":enteredotp};
    this.authservice.otpverify(packet).subscribe((data:any)=>{
     
      if(data.succeeded)
      {
     
        sessionStorage.setItem('token',data.token);
        
        this.router.navigate(['/login']);
      }
      else
      {
       this.isotperror=true;
        }
    },
    (err:HttpErrorResponse)=>
    {
      this.isotperror=true;
    }
    )
  }

  sendotpagain()
  {
  let packet={"email":localStorage.getItem('email'),"otp":Math.floor(100000 + Math.random() * 900000).toString()};
  this.authservice.resendregisterotp(packet).subscribe((data:any)=>{
    if(data.succeeded)
    {

      this.router.navigate(['/otp-verification']);
    }
    else{

    }
},
(err:HttpErrorResponse)=>
{
  this.router.navigate(['/register']); 
}
  );
}
}
