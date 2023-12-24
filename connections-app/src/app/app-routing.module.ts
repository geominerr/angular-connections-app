import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardLogged } from './auth/guards/auth-logged.guard';
import { AuthGuardNotLogged } from './auth/guards/auth-not-logged.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./connections/pages/main/main-page.component').then(
        (m) => m.MainPageComponent
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
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/components/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [AuthGuardNotLogged],
  },
  {
    path: 'group/:id',
    loadComponent: () =>
      import('./connections/pages/dialog-page/dialog-page.component').then(
        (m) => m.DialogPageComponent
      ),
    canActivate: [AuthGuardNotLogged],
  },
  {
    path: 'conversation/:id',
    loadComponent: () =>
      import(
        './connections/pages/conversation-page/conversation-page.component'
      ).then((m) => m.ConversationPageComponent),
    canActivate: [AuthGuardNotLogged],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
