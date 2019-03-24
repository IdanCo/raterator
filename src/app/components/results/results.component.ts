import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../types/candidate.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  candidates$: Observable<Candidate[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.candidates$ = this.db.collection<Candidate>(
      'candidates',
      ref => ref.orderBy('totalVotes', 'desc')
    )
      .valueChanges();
  }

}
