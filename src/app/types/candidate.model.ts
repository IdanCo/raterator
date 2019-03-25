import * as firebase from 'firebase';
import { User } from './user.model';

export interface Candidate {
  user: User;
  title: string;
  description: string;
  imageURL?: string;
  lastUpdate: firebase.firestore.Timestamp;
  totalVotes?: number;
  votes?: {
    [key: string]: number;
  };
}
