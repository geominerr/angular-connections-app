import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardLogged } from './auth/guards/auth-logged.guard';
import { AuthGuardNotLogged } from './auth/guards/auth-not-logged.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./connections/components/main/main.component').then(
        (m) => m.MainComponent
      ),
    canActivate: [AuthGuardNotLogged],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    canActivate: [AuthGuardLogged],
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/components/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
    canActivate: [AuthGuardLogged],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
