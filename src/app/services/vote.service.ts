import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../types/candidate.model';
import { User } from '../types/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private db: AngularFirestore,
              private snackBar: MatSnackBar) { }

  setVote(candidate: Candidate, user: User, vote: number) {
    if (!user) {
      this.snackBar.open('Please login to vote');
      return;
    }

    if ((user.totalVotes + vote) > environment.maxVotesPerUser) {
      this.snackBar.open('Maximum votes reached. Consider down voting...');
      return;
    }

    return Promise.all([
      this.updateCandidateVotes(candidate, user, vote),
      this.updateUserVotes(user, vote)
    ])
  }

  updateCandidateVotes(candidate: Candidate, user: User, vote: number) {
    candidate.votes = candidate.votes || {};
    let currentVote = (candidate.votes[user.uid] || 0) + vote;
    if (currentVote < 0) currentVote = 0;

    candidate.votes[user.uid] = currentVote;
    candidate.totalVotes = (candidate.totalVotes || 0) + vote;

    return this.db.doc<Candidate>(`candidates/${candidate.user.uid}`).update(candidate);
  }

  updateUserVotes(user: User, vote: number) {
    let userTotalVotes = (user.totalVotes || 0) + vote;
    if (userTotalVotes < 0) userTotalVotes = 0;

    return this.db.doc<User>(`users/${user.uid}`).update({ totalVotes: userTotalVotes });
  }
}
