import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../../types/candidate.model';
import { AuthService } from '../../services/auth.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor(public auth: AuthService,
              private voteService: VoteService) { }

  ngOnInit() {
  }

  onVote(vote: number) {
    this.voteService.setVote(this.candidate, vote);
  }

}
