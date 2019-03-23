import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'candidate',
    component: CandidateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
