import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { FileValidator } from 'ngx-material-file-input';
import { switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Candidate } from '../../types/candidate.model';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';


@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss']
})
export class CandidateEditComponent implements OnInit {
  formGroup: FormGroup;
  candidate$: Observable<Candidate>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private db: AngularFirestore,
              private storage: AngularFireStorage,
              private auth: AuthService,
              private spinner: SpinnerService) {
    this.buildForm();
  }

  ngOnInit() {
    this.spinner.showSpinner();

    this.candidate$ = this.auth.user$.pipe(
      switchMap(user => this.db.doc<Candidate>(`candidates/${user.uid}`).valueChanges()),
      tap(candidate => {
        this.spinner.stopSpinner();
        if (candidate) {
          this.formGroup.patchValue(candidate)
        } else {
          this.addImageField()
        }
      }),
    );
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      imageURL: ['']
    });
  }

  uploadFile(file: File) {
    const path = `candidates/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    return this.storage.upload(path, file)
      .then(() => ref.getDownloadURL().toPromise());
  }

  async onSubmit(formGroup: FormGroup) {
    if (!formGroup.valid) return;

    this.spinner.showSpinner();

    const candidatesCollection = this.db.collection<Candidate>('candidates');
    const candidate: Candidate = {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      user: this.auth.user,
      lastUpdate: firebase.firestore.Timestamp.now()
    };

    if (formGroup.contains('image')) {
      const file = formGroup.get('image').value.files[0] as File;
      candidate.imageURL = await this.uploadFile(file);
    } else {
      candidate.imageURL = formGroup.get('imageURL').value;
    }

    candidatesCollection.doc(this.auth.user.uid).set(candidate)
      .then(() => {
        this.spinner.stopSpinner();
        this.router.navigate(['/'])
      });
  }

  removeExistingImage() {
    this.addImageField();
  }

  addImageField() {
    const image = new FormControl('');
    image.setValidators([Validators.required, FileValidator.maxContentSize(10485760)]);
    this.formGroup.addControl('image', image);
  }
}
