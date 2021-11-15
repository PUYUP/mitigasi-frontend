import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Feed',
    loadChildren: () =>
      import('./folder/feed/feed.module').then((m) => m.FeedPageModule),
  },
  {
    path: 'Home',
    loadChildren: () =>
      import('./folder/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'Activity',
    loadChildren: () =>
      import('./folder/activity/activity.module').then(
        (m) => m.ActivityPageModule
      ),
  },
  {
    path: 'Security',
    loadChildren: () =>
      import('./folder/security/security.module').then(
        (m) => m.SecurityPageModule
      ),
  },
  {
    path: 'Profile',
    loadChildren: () =>
      import('./folder/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },

  // CONTRIBUTION
  {
    path: 'FoodKit',
    loadChildren: () =>
      import('./contribution/food-kit/food-kit.module').then(
        (m) => m.FoodKitPageModule
      ),
  },
  {
    path: 'Donate',
    loadChildren: () =>
      import('./contribution/donate/donate.module').then(
        (m) => m.DonatePageModule
      ),
  },
  {
    path: 'Disaster',
    loadChildren: () =>
      import('./ews/disaster/disaster.module').then(
        (m) => m.DisasterPageModule
      ),
  },
  {
    path: 'Disaster',
    loadChildren: () =>
      import('./contribution/report/report.module').then(
        (m) => m.ReportPageModule
      ),
  },
  {
    path: 'Comment',
    loadChildren: () =>
      import('./contribution/comment/comment.module').then(
        (m) => m.CommentPageModule
      ),
  },

  // PERSON
  {
    path: 'SignIn',
    loadChildren: () =>
      import('./person/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'SignUp',
    loadChildren: () =>
      import('./person/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'Boarding',
    loadChildren: () =>
      import('./person/boarding/boarding.module').then((m) => m.BoardingModule),
  },
  {
    path: 'Validation',
    loadChildren: () =>
      import('./person/validation/validation.module').then(
        (m) => m.ValidationModule
      ),
  },
  /*
  {
    path: 'Profile',
    loadChildren: () =>
      import('./person/profile/profile.module').then((m) => m.ProfileModule),
  },
  */
  {
    path: 'Security',
    loadChildren: () =>
      import('./person/security/security.module').then((m) => m.SecurityModule),
  },
  {
    path: 'PasswordRecovery',
    loadChildren: () =>
      import('./person/password-recovery/password-recovery.module').then(
        (m) => m.PasswordRecoveryModule
      ),
  },
  {
    path: 'Threat',
    loadChildren: () =>
      import('./threat/threat.module').then((m) => m.ThreatPageModule),
  },
  {
    path: 'Generic',
    loadChildren: () =>
      import('./generic/generic.module').then((m) => m.GenericModule),
  },
  {
    path: 'Sensor',
    loadChildren: () =>
      import('./sensor/sensor.module').then((m) => m.SensorPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
