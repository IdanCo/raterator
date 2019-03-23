import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Overlay } from '@angular/cdk/overlay';
import { AuthService } from '../../services/auth.service';
import { FileValidator } from 'ngx-material-file-input';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Candidate } from '../../types/candidate.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss']
})
export class CandidateEditComponent implements OnInit {
  formGroup: FormGroup;
  candidateDoc: AngularFirestoreDocument<Candidate>;
  candidate$: Observable<Candidate>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private db: AngularFirestore,
              private storage: AngularFireStorage,
              private overlay: Overlay,
              private auth: AuthService) {
    this.buildForm();
  }

  ngOnInit() {
    this.candidate$ = this.auth.user$.pipe(
      switchMap(user => this.db.doc<Candidate>(`candidates/${user.uid}`).valueChanges()),
      filter(candidate => !!candidate),
      tap(candidate => this.formGroup.patchValue(candidate))
    );
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      // image: ['', [Validators.required, FileValidator.maxContentSize(10485760)]]
    });
  }

  onSubmit(formGroup: FormGroup) {
    if (!formGroup.valid) return;

    const candidatesCollection = this.db.collection<Candidate>('candidates');

    const candidate: Candidate = {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      user: this.auth.user,
      lastUpdate: firebase.firestore.Timestamp.now()
    };

    candidatesCollection.doc(this.auth.user.uid).set(candidate)
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
