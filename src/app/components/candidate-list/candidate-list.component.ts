import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Candidate } from '../../types/candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidates: Observable<Candidate[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.candidates = this.db.collection<Candidate>(
      'candidates',
      ref => ref.orderBy('lastUpdate', 'desc')
    )
      .valueChanges();
  }

}
