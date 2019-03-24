import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../types/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private db: AngularFirestore,
              private snackBar: MatSnackBar,
              private auth: AuthService) { }

  setVote(candidate: Candidate, vote: number) {
    if (!this.auth.user) {
      this.snackBar.open('Please login to vote');
      return;
    }

    candidate.votes = candidate.votes || {};

    let currentVote = (candidate.votes[this.auth.user.uid] || 0) + vote;
    if (currentVote < 0) currentVote = 0;

    candidate.votes[this.auth.user.uid] = currentVote;

    this.db.doc<Candidate>(`candidates/${candidate.user.uid}`).update(candidate)

  }
}
