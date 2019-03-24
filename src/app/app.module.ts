import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './material/material.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSpinner } from '@angular/material';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UserProfileComponent,
    CandidateEditComponent,
    CandidateListComponent,
    CandidateComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
  ],
  providers: [AuthService],
  entryComponents: [ MatSpinner ],
  bootstrap: [AppComponent]
})
export class AppModule { }
