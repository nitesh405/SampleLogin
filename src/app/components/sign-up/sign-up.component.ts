import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuthService } from 'src/app/services/angular-fire-auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  loading:boolean=false;
  constructor(private fb: FormBuilder, private fireAuthService: AngularFireAuthService,private router: Router) { }
  signUpDetails = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  submit() {
    let { email, password } = this.signUpDetails.value;
    this.loading=true;
    this.fireAuthService.signUp(email, password).then((res:any)=>{
      if(res){
        this.loading=false;
        this.router.navigate(['/dashboard'])
      }
    
    }).catch(err=>{
      this.loading=false;
      console.log(err)
    })
  }
}
