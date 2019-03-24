import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Candidate } from '../../types/candidate.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  maxVotesPerUser = environment.maxVotesPerUser;
  candidates$: Observable<Candidate[]>;

  constructor(public auth: AuthService,
              private db: AngularFirestore) { }

  ngOnInit() {
    this.candidates$ = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection<Candidate>('candidates', ref => ref.where(`votes.${user.uid}`, '>', 0)).valueChanges()
      )
    );
  }

}
