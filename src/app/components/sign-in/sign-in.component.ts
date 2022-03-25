import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuthService } from 'src/app/services/angular-fire-auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  message: string = ''
  loading:boolean=false;
  constructor(private fb: FormBuilder, private fireAuthService: AngularFireAuthService, private router: Router) { }
  loginDetails = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  submit() {
    let { email, password } = this.loginDetails.value;
    this.loading=true;
    this.fireAuthService.signIn(email, password).then((res:any) => {
      console.log("you are signed in", res)
      this.loading=false;
      this.router.navigate(['/dashboard'])
    }).catch(err => {
      console.log(err)
      this.loading=false;
      this.message = "Email or Password is incorrect"
    })
  }
}
