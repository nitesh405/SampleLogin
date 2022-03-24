import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {AngularFireAuthGuard ,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/compat/auth-guard'
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { ListOfFilesComponent } from './components/list-of-files/list-of-files.component';

//auth pipes

const redirectUnauthorizedToLogin =()=> redirectUnauthorizedTo(['sign-In'])
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard'])
const routes: Routes = [
    {
      path: '',
      redirectTo: 'sign-In',
      pathMatch: 'full'
    },
    {
        path:'sign-In',
        component:SignInComponent,
        canActivate:[AngularFireAuthGuard],
        data:{authGuardPipe:redirectLoggedInToDashboard}
    },
    {
      path:'sign-Up',
      component:SignUpComponent,
      canActivate:[AngularFireAuthGuard],
      data:{authGuardPipe:redirectLoggedInToDashboard}
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToLogin}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }